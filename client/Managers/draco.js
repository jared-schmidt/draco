if (Meteor.isClient) {

  Meteor.startup(function () {
    // code to run on server at startup
    // console.log(Meteor.connection._lastSessionId)
    // if (hasGetUserMedia()) {
    //   // Good to go!
    //   console.log("good to go");
    // } else {
    //   alert('getUserMedia() is not supported in your browser');
    // }

    // function hasGetUserMedia() {
    //   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    //             navigator.mozGetUserMedia || navigator.msGetUserMedia);
    // }

    // if ('SpeechRecognition' in window) {
    //   // Speech recognition support. Talk to your apps!
    //   console.log("Speech recognition support.");
    // } else {
    //   console.error('No Speech');
    // }
  });




  var DracoTalk = null;
  if ('speechSynthesis' in window) {
   // Synthesis support. Make your web apps talk!
   console.log("Synthesis support.");
   DracoTalk = new SpeechSynthesisUtterance();
  } else {
    console.error("No Synthesis support.");
  }


  var speechUtteranceChunker = function (utt, settings, callback) {
      settings = settings || {};
      var newUtt;
      var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
      if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
          newUtt = utt;
          newUtt.text = txt;
          newUtt.addEventListener('end', function () {
              if (speechUtteranceChunker.cancel) {
                  speechUtteranceChunker.cancel = false;
              }
              if (callback !== undefined) {
                  callback();
              }
          });
      }
      else {
          var chunkLength = (settings && settings.chunkLength) || 160;
          var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
          var chunkArr = txt.match(pattRegex);

          if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
              //call once all text has been spoken...
              if (callback !== undefined) {
                  callback();
              }
              return;
          }
          var chunk = chunkArr[0];
          newUtt = new SpeechSynthesisUtterance(chunk);
          var x;
          for (x in utt) {
              if (utt.hasOwnProperty(x) && x !== 'text') {
                  newUtt[x] = utt[x];
              }
          }
          newUtt.addEventListener('end', function () {
              if (speechUtteranceChunker.cancel) {
                  speechUtteranceChunker.cancel = false;
                  return;
              }
              settings.offset = settings.offset || 0;
              settings.offset += chunk.length - 1;
              speechUtteranceChunker(utt, settings, callback);
          });
      }

      if (settings.modifier) {
          settings.modifier(newUtt);
      }
      console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
      //placing the speak invocation inside a callback fixes ordering and onend issues.
      setTimeout(function () {
          speechSynthesis.speak(newUtt);
      }, 0);
  };

  // client code: ping heartbeat every 5 seconds
  Meteor.setInterval(function () {
    Meteor.call('keepalive', Meteor.connection._lastSessionId);
  }, 5000);


  Deps.autorun(function() {
      Meteor.subscribe('messages');
      Notification.requestPermission();
      // Meteor.subscribe('desktopNotifications');
      Meteor.autosubscribe(function() {

          DesktopNotifications.find({}).observe({
              added: function(notification) {
                  new Notification(notification.title, {
                      dir: 'auto',
                      lang: 'en-US',
                      body: notification.body,
                      icon: notification.icon
                  });
              }
          });

          // MediaStreamTrack.getSources(function(sourceInfos) {
          //   var audioSource = null;

          //   for (var i = 0; i != sourceInfos.length; ++i) {
          //     var sourceInfo = sourceInfos[3];
          //     if (sourceInfo.kind === 'audio') {
          //       console.log(sourceInfo.id, sourceInfo.label || 'microphone');
          //       console.log(sourceInfo);
          //       audioSource = sourceInfo.id;
          //     } else {
          //       console.log('Some other kind of source: ', sourceInfo);
          //     }
          //   }
          //   console.log(audioSource);
          //   sourceSelected(audioSource);
          // });

          // function sourceSelected(audioSource) {
          //   var constraints = {
          //     audio: {
          //       optional: [{sourceId: audioSource}]
          //     }
          //   };

          //   navigator.webkitGetUserMedia(constraints, successCallback, errorCallback);
          // }

          // successCallback = function(stream){
          //   var microphone = context.createMediaStreamSource(stream);
          //   console.log(stream);
          //   microphone.connect(filter);
          // };

          // errorCallback = function(err){
          //   console.log(err);
          // };

          Sounds.find({}).observe({
            added:function(sound){
              console.log("Sound added to collection");
              if(!sound.played){
                if (!sound.speech){
                  var soundHowl = new Howl({
                    urls:[sound.url],
                    onload: function(){
                      console.log("Sound Loaded");
                    },
                    onloaderror: function(err){
                      console.log("Load error");
                      console.log(err);
                    },

                    onend: function(){
                      console.log("sound over");
                    }
                  }).play();
                } else {
                  // tts.speak(sound.url, sound.lang);

                  var voices = window.speechSynthesis.getVoices();
                  var index = 1;
                  if (!isNaN(sound.lang)){
                    console.log("len -> ", voices.length-1);
                    if (sound.lang >= 0 && sound.lang < voices.length-1)
                    index = sound.lang;
                  }

                  if (voices){
                  DracoTalk.voice = voices[index];
                  DracoTalk.voiceURI = voices[index].voiceURI;
                  DracoTalk.lang = voices[index].lang;
                  DracoTalk.volume = 1;

                    DracoTalk.text = sound.url;

                    speechUtteranceChunker(DracoTalk, {
                        chunkLength: 120
                    }, function () {
                        //some code to execute when done
                        console.log('done');
                    });

                  }
                  // window.speechSynthesis.speak(DracoTalk);
                  DracoTalk.onend = function(e) {
                    console.log('Finished in ' + event.elapsedTime + ' seconds.');
                  };

                }
                Meteor.call('playedSound', sound._id, Meteor.connection._lastSessionId);
              }
            },
            remove: function(oldSound){
              console.log("Removed Sound from collection");
            },
            changed: function(){
              console.log("Sound Collection changed");
            }
          });
      });
  });


  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.home.helpers({
    counter: function () {
      var count = Session.get("counter");
      return count;
    },
    people: function(){
      return People.find().fetch();
    },
    current_question: function(){
      var questions = Game.find().fetch();
      if (questions[questions.length-1]){
        return questions[questions.length-1].question_question;
      }
    }
  });



  Template.home.events({
    'click #getVoices': function(){
      var voices = window.speechSynthesis.getVoices();
      for (var i=0; i<=voices.length;i++){
        var voice = voices[i];
        if (voice){
          $('#voiceTable > tbody:last').append('<tr><td>'+i+'</td><td>'+voice.name+'</td><td>'+voice.lang+'</td></tr>');
        }
      }
      alert("If didn't load press button 1 more time");
    },
    'click #yourButton': function () {
      // var recognition = new webkitSpeechRecognition();
      // recognition.continuous = false;
      // recognition.interimResults = true;
      // recognition.onresult = function(event) {
      //   console.log(event);
      //   console.log(event.results[0][0].transcript)
      //   if (event.results[0][0].transcript.indexOf("ok draco") >= 0){
      //     console.log("Match");
      //   }
      // }
      // recognition.start();
    },
    'click #count': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);

      var count = Session.get("counter");

      var days = 100;
      console.log(count);
      if (count ==  10){
        var left = days - 10;
        Meteor.call('outgoing', "Something will happen in "+ left+" clicks");
      }
      else if (count == 15){
        var left = days - 15;
        Meteor.call('outgoing', "Something will happen in "+ left +" clicks");
      }
      else if (count == 25){
        var left = days - 25;
        Meteor.call('outgoing', "Something will happen in "+ left +" clicks");
      }
      else if (count == 40){
        var left = days - 40;
        Meteor.call('outgoing', "Something will happen in "+ left+" clicks");
      }
      else if (count == 50){
        var left = days - 50;
        Meteor.call('outgoing', "Something will happen in "+ left +" clicks");
      }
      else if (count == 70){
        var left = days - 70;
        Meteor.call('outgoing', "Something will happen in "+ left +" clicks");
      }
      else if (count == 90){
        var left = days - 90;
        Meteor.call('outgoing', "Something will happen in "+ left +" clicks");
      }
      else if (count == 100){
        Meteor.call('outgoing', "Something will happen...");
      }

    }
  });
}

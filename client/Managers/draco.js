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

  // //! annyang
  // //! version : 1.6.0
  // //! author  : Tal Ater @TalAter
  // //! license : MIT
  // //! https://www.TalAter.com/annyang/
  // (function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=!1,l=/\s*\((.*?)\)\s*/g,m=/(\(\?:[^)]+\))\?/g,n=/(\(\?)?:\w+/g,o=/\*\w+/g,p=/[\-{}\[\]+?.,\\\^$|#]/g,q=function(a){return a=a.replace(p,"\\$&").replace(l,"(?:$1)?").replace(n,function(a,b){return b?a:"([^\\s]+)"}).replace(o,"(.*?)").replace(m,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},r=function(a){a.forEach(function(a){a.callback.apply(a.context)})},s=function(){t()||b.annyang.init({},!1)},t=function(){return d!==a};b.annyang={init:function(l,m){m=m===a?!0:!!m,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous="http:"===b.location.protocol,d.lang="en-US",d.onstart=function(){r(g.start)},d.onerror=function(a){switch(r(g.error),a.error){case"network":r(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,r((new Date).getTime()-h<200?g.errorPermissionBlocked:g.errorPermissionDenied)}},d.onend=function(){if(r(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){if(k)return i&&b.console.log("Speech heard, but annyang is paused"),!1;r(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Speech recognized: %c"+c,j);for(var h=0,l=f.length;l>h;h++){var m=f[h].command.exec(c);if(m){var n=m.slice(1);return i&&(b.console.log("command matched: %c"+f[h].originalPhrase,j),n.length&&b.console.log("with parameters",n)),f[h].callback.apply(this,n),r(g.resultMatch),!0}}}return r(g.resultNoMatch),!1},m&&(f=[]),l.length&&this.addCommands(l)},start:function(c){k=!1,s(),c=c||{},e=c.autoRestart!==a?!!c.autoRestart:!0,c.continuous!==a&&(d.continuous=!!c.continuous),h=(new Date).getTime();try{d.start()}catch(f){i&&b.console.log(f.message)}},abort:function(){e=!1,t&&d.abort()},pause:function(){k=!0},resume:function(){b.annyang.start()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){s(),d.lang=a},addCommands:function(a){var c,d;s();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=q(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Commands successfully loaded: %c"+f.length,j)},removeCommands:function(b){return b===a?void(f=[]):(b=Array.isArray(b)?b:[b],void(f=f.filter(function(a){for(var c=0;c<b.length;c++)if(b[c]===a.originalPhrase)return!1;return!0})))},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);

  // if (annyang) {
  //   // Let's define a command.
  //   var commands = {
  //     'hello': function() { alert('Hello world!'); }
  //   };

  //   // Add our commands to annyang
  //   annyang.addCommands(commands);

  //   // Start listening.
  //   annyang.start();
  // }

// Template.home.rendered = function(){
  var DracoTalk = null;
  if ('speechSynthesis' in window) {
   // Synthesis support. Make your web apps talk!
   console.log("Synthesis support.");
   DracoTalk = new SpeechSynthesisUtterance();
  } else {
    console.error("No Synthesis support.");
  }
// }

var options = {
    location: 'Johnstown, PA',
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="sw icon-'+weather.code+'"></i> '
      html += weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region +'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  }

  Weather.options = options


  var speechUtteranceChunker = function (utt, settings, callback) {
      settings = settings || {};
      // console.log("utt ",utt);
      // console.log("settings ", settings)
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

      newUtt.voice = utt.voice;
      newUtt.voiceURI = utt.voiceURI;
      newUtt.lang = utt.lang;
      newUtt.volume = utt.volume;
      newUtt.rate = utt.rate;
      newUtt.pitch = utt.pitch;
      newUtt.onend = utt.onend;

      newUtt.onerror = utt.onerror;
      newUtt.onstart = utt.onstart;

      // console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
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

          YoutubeVideos.find({}).observe({
              added: function(video){
                //   var url = video.url.replace("watch?v=", "v/");
                  $("#youtube").attr('src', video.url);
                  $("#gifWho").text(video.addedBy);
                  $("#gifText").text(video.text);

              }
          });

          Sounds.find({}).observe({
            added:function(sound){
              console.log("Sound added to collection");
              if(!sound.played){
                if (!sound.speech){
                  var soundHowl = new Howl({
                    urls:[sound.url],
                    onload: function(){
                        $('#sound').text(sound.url);
                      console.log("Sound Loaded");
                      Raptorize();
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
                    // console.log("len -> ", voices.length-1);
                    if (sound.lang >= 0 && sound.lang < voices.length-1)
                    index = sound.lang;
                  }

                  console.log("Sound URL/Text -> ", sound.url);

                  if (voices){
                    $('#talk').text(sound.url);
                    var msg = new SpeechSynthesisUtterance();
                    msg.voice = voices[index]; // Note: some voices don't support altering params
                    msg.voiceURI = 'native';
                    msg.volume = 1; // 0 to 1
                    msg.rate = sound.rate; // 0.1 to 10
                    msg.pitch = sound.pitch; //0 to 2
                    msg.text = sound.url;
                    if (voices[index]){
                        msg.lang = voices[index].lang;
                    }

                    msg.onend = function(e) {
                      console.log('Finished in ' + event.elapsedTime + ' seconds.');
                      speechSynthesis.cancel()
                    };

                    msg.onerror = function(e){
                      console.log("Error in sound");
                      speechSynthesis.cancel();
                    };

                    msg.onstart = function(e){
                      console.log("Start Talk");
                    };

                    // speechUtteranceChunker(msg, {
                    //     chunkLength: 120
                    // }, function () {
                    //     //some code to execute when done
                    //     console.log('done');
                    //     speechSynthesis.cancel();
                    // });
                    window.speechSynthesis.speak(DracoTalk);
                  }



                }
                Meteor.call('playedSound', sound._id, Meteor.connection._lastSessionId);
              }
            },
            remove: function(oldSound){
              console.log("Removed Sound from collection");
              speechSynthesis.cancel();
            },
            changed: function(){
              console.log("Sound Collection changed");
              speechSynthesis.cancel();
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

  Template.home.rendered = function(){
    $('.clock').FlipClock({
        clockFace: 'TwelveHourClock'
    });
  };


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

if (Meteor.isClient) {

  Meteor.startup(function () {
    // code to run on server at startup
  });


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

          Sounds.find({}).observe({
            added:function(sound){
              if(!sound.played){
                if (!sound.speech){
                  var soundHowl = new Howl({
                    urls:[sound.url],
                    onend: function(){
                      console.log("sound over");
                    }
                  }).play();
                } else {
                  tts.speak(sound.url, sound.lang);
                }
                Meteor.call('playedSound', sound._id);
              }
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

      return questions[questions.length-1].question_question;
    }
  });



  Template.home.events({
    'click #yourButton': function () {
      alert("no");
      // Meteor.call('publishNotification', {
      //     title: 'Orders Being Placed',
      //     body: "Test Notification",
      //     icon: 'brown-bag.png'
      // });
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

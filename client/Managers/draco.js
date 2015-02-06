if (Meteor.isClient) {
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
    'click button': function () {
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

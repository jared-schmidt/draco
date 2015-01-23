if (Meteor.isServer) {

  function bot_talk(message, channel){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = Meteor.settings['slack_api_token'];

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": message,
        "icon_emoji": ':ghost:',
        "username": "Draco (Ghost)",
        'parse':"full"
    }
    var result = HTTP.call("GET", url, {params: payload});
  }


    SyncedCron.add({
      name: 'Say goodbye',
      schedule: function(parser) {
        return parser.text('every weekday at 9:55pm');
      },
      job: function() {
        image = 'http://dracobot.meteor.com/images/goodbye.jpg';
        bot_talk(image, 'G037P84PQ');
      }
    });

    SyncedCron.add({
      name: 'Brown-Bag Time',
      schedule: function(parser) {
        return parser.text('at 3:00pm on Thurs');
      },
      job: function() {
        bot_talk('Vote http://brown-bag.meteor.com/', 'G037P84PQ');
      }
    });


    SyncedCron.add({
      name: 'Submit Time-last day',
      schedule: function(parser) {
        return parser.text('at 9:00pm on the last day of the month');
      },
      job: function() {
        bot_talk('Remember to submit your time. https://problemsolutions.tsheets.com/', 'G037P84PQ');
      }
    });

    SyncedCron.add({
      name: 'Submit Time-15th',
      schedule: function(parser) {
        return parser.text('at 9:00pm on the 15th day of the month');
      },
      job: function() {
        bot_talk('Remember to submit your time. https://problemsolutions.tsheets.com/', 'G037P84PQ');
      }
    });

    SyncedCron.start();


}
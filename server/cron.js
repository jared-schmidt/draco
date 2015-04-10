if (Meteor.isServer) {

  function bot_talk(message, channel){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = Meteor.settings['slack_api_token'];

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": '@group: ' + message,
        "icon_emoji": ':ghost:',
        "username": "Draco (Ghost)",
        'parse':"full"
    };
    var result = HTTP.call("GET", url, {params: payload});
  }


  SyncedCron.config({
    // Log job run details to console
    log: true,

    // Use a custom logger function (defaults to Meteor's logging package)
    logger: null,

    // Name of collection to use for synchronisation and logging
    collectionName: "cronHistory",

    // Default to using localTime
    utc: false,

    /*
      TTL in seconds for history records in collection to expire
      NOTE: Unset to remove expiry but ensure you remove the index from
      mongo by hand

      ALSO: SyncedCron can't use the `_ensureIndex` command to modify
      the TTL index. The best way to modify the default value of
      `collectionTTL` is to remove the index by hand (in the mongo shell
      run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your
      project. SyncedCron will recreate the index with the updated TTL.
    */
    collectionTTL: 172800
  });

  SyncedCron.add({
    name: 'Say goodbye',
    schedule: function(parser) {
      return parser.text('every weekday at 8:50pm');
    },
    job: function() {
      image = 'http://dracobot.meteor.com/images/goodbye.jpg';
      bot_talk(image, 'G045PRA4A');
    }
  });

  SyncedCron.add({
    name: 'Brown-Bag Time',
    schedule: function(parser) {
      return parser.text('at 2:00pm on Thurs');
    },
    job: function() {
      bot_talk('Vote http://brown-bag.meteor.com/', 'G045PRA4A');
    }
  });


  SyncedCron.add({
    name: 'Submit Time-last day',
    schedule: function(parser) {
      return parser.text('at 8:00pm on the last day of the month');
    },
    job: function() {
      bot_talk('Remember to submit your time. https://problemsolutions.tsheets.com/', 'G045PRA4A');
    }
  });


  SyncedCron.add({
    name: 'Submit Time-15th',
    schedule: function(parser) {
      var hour = 20;
      var th_scheduler = parser.recur()
                .on(15).dayOfMonth().onWeekday().on(hour).hour()
              .and()
                .on(13).dayOfMonth().on(6).dayOfWeek().on(hour).hour()
              .and()
                .on(14).dayOfMonth().on(2).dayOfWeek().on(hour).hour()

      return th_scheduler;
    },
    job: function() {
      bot_talk('Remember to submit your time. https://problemsolutions.tsheets.com/', 'G045PRA4A');
    }
  });

  SyncedCron.start();


}
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

      var base_url = 'http://dracobot.meteor.com/sounds/';
      var url = base_url + 'home.mp3';
      Meteor.call('pushSound', 'draco', url, 'en', false);
    }
  });

  // 1:00pm = 9:00am
  // 2:00pm = 10:00am
  // 3:00pm = 11:00am
  // 4:00pm = 12:00pm
  // 5:00pm = 1:00pm
  // 6:00pm = 2:00pm
  // 7:00pm = 3:00pm
  // 8:00pm = 4:00pm

  SyncedCron.add({
    name: 'Morning News',
    schedule: function(parser) {
      return parser.text('every weekday at 1:30pm');
    },
    job: function() {
      var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=15904,us&units=imperial'
      var weatherData = get_call(weatherURL);

      var currentTemp = weatherData.main.temp;
      var currentWeatherType = weatherData.weather[0].description;
      var townName = weatherData.name;

      var weatherString = 'It is currently ' + currentTemp + ' degrees in ' + townName + ' with ' + currentWeatherType;

      var message = 'Gooooood Morning, Problem Solutions! ' + weatherString;
      Meteor.call('pushSound', 'draco', message, 'en', true);
    }
  });

  SyncedCron.add({
    name: 'Brown-Bag Time',
    schedule: function(parser) {
      return parser.text('at 2:00pm on Thurs');
    },
    job: function() {
      bot_talk('@group: Vote http://brown-bag.meteor.com/', 'G045PRA4A');
      Meteor.call('pushSound', 'draco', 'Time to vote on the brown-bag site.', 'en', true);
    }
  });


  SyncedCron.add({
    name: 'Submit Time-last day',
    schedule: function(parser) {
      return parser.text('at 8:00pm on the last day of the month');
    },
    job: function() {
      bot_talk('@group: Remember to submit your time. https://problemsolutions.tsheets.com/', 'G045PRA4A');
      Meteor.call('pushSound', 'draco', 'Remember to submit your time', 'en', true);
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
      bot_talk('@group: Remember to submit your time. https://problemsolutions.tsheets.com/', 'G045PRA4A');
      Meteor.call('pushSound', 'draco', 'Remember to submit your time', 'en', true);
    }
  });

  SyncedCron.start();


}
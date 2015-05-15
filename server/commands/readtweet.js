readtweet = {
    start:function(slack){
        var text = '';
        var lang = 'en_gb';
        var charLimit = 100;

        var tag = slack.text.replace('#', '');

        Twit = new TwitMaker({
          consumer_key:         'c8tvXQDDgmV2F2yCIGuAgxPGS',
          consumer_secret:      'TpDpM8L0Y3FVX5pAjhG5HQZ3oDNADpz9WuHpws469uwmkZwMUj',
          access_token:         '873667988-PaiMXZsPuQlE3196TN1Vh6Im1rvu33kzyrXC7mRG',
          access_token_secret:  'Gzu1ueBo7SybR6hQsPYHFxIT03WWaWIsfwZu63tJUZOS1'
        });

        Twit.get('search/tweets', { q: '#'+tag, count: 1, result_type:'recent'  }, Meteor.bindEnvironment(function(err, data, response) {
          // console.log(data)
          var text = data.statuses[0].text;
          console.log("TWEET TEXT -> ", text);

          var stringToLong = text.length >= charLimit;

          if(text){
              // if (stringToLong){
              //     text = text.substring(0, 99);
              //     console.log("TRIMMING TWEET");
              // }

              text = text.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,"");

              console.log("sending tweet");
              Meteor.call('pushSound', slack.slack_name + " Twitter", text.replace('#', ''), lang, true);
          }
          else {
            console.error("DID NOT WORK");
          }

        }, function(){
          console.log("Failed to bind.");
        }));
        message = "Lets try this";
        return message;
    }
};

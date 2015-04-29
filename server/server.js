if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    'outgoing': function(message){
      var url = 'https://slack.com/api/chat.postMessage';
      var slack_api_token = Meteor.settings['slack_api_token'];

      var payload = {
          "token":slack_api_token,
          "channel":'G037P84PQ',
          "text": message,
          "icon_emoji": ':ghost:',
          "username": "Draco (Ghost)",
          'parse':"full"
      }
      var result = HTTP.call("GET", url, {params: payload});
    },
    'caughtFish': function(person){
      var url = 'https://slack.com/api/chat.postMessage';
      var slack_api_token = Meteor.settings['slack_api_token'];

      var randomTime = Random.fraction() * 100000;
      People.update({'_id': person._id}, {$set:{'fishTime':randomTime}});

      var fishList = [
        {
          'name': 'blue',
          'chance': 80
        },
        {
          'name': 'gold',
          'chance': 4
        },
        {
          'name': 'red',
          'chance': 70
        },
        {
          'name': 'pink',
          'chance': 13
        },
        {
          'name': 'rainbow',
          'chance': 18
        },
        {
          'name': 'boot',
          'chance': 99
        },
        {
          'name': 'bottle',
          'chance': 98
        },
        {
          'name':'silver',
          'chance': 5
        },
        {
          'name': 'clear',
          'chance': Random.fraction() * 100
        },
        {
          'name': 'purple',
          'chance': 43
        },
        {
          'name': 'palomino',
          'chance': 7
        },
        {
          'name': 'steve',
          'chance': 1
        },
        {
          'name': 'white',
          'chance': Random.fraction() * 100
        },
        {
          'name': 'black',
          'chance': Random.fraction() * 100
        }
      ]

      var obj = {
        // 'message': outMsg,
        'userid': person._id,
        'name': person.name
      }

      Meteor.setTimeout(function(){

        var chance = Random.fraction() * 100;
        var fish = Random.choice(fishList)

        if (fish.chance >= chance){
          outMsg = '@'+person['name'] + " caught " + fish.name + ' fish!';
          People.update({'_id': person._id}, {$push: {'fishes': fish.name}});
        } else {
          outMsg = '@'+person['name'] + " just lost a " + fish.name + ' fish!';
        }

        People.update({'_id': obj.userid}, {$set:{'fishing':false}});

        var payload = {
            "token":slack_api_token,
            "channel":'@'+obj.name,
            "text": outMsg,
            "icon_emoji": ':fish:',
            "username": "Fish",
            'parse':"full"
        }
        var result = HTTP.call("GET", url, {params: payload});

        Meteor.call('publishNotification', {
            title: 'Fish',
            body: outMsg,
            icon: 'brown-bag.png'
        });

      }, randomTime, obj);



      // message = 'FISH MESSAGE!!!'
    },
    publishNotification: function(notification){
            DesktopNotifications.remove({});
            DesktopNotifications.insert(notification);
            setTimeout(Meteor.bindEnvironment(function() {
                DesktopNotifications.remove({}); //remove all again so we don't get pop ups when first loading
            }));
    },
    pushSound:function(name, soundUrl, lang, speech){
      // Sounds.remove({});
      Sounds.insert({
        'calledby': name,
        'url':soundUrl,
        'speech': speech,
        'lang': lang,
        'played': false,
        'playing': false
      });
      // setTimeout(Meteor.bindEnvironment(function(){
      //   Sounds.remove({});
      // }));
    },
    playedSound:function(soundID){
      console.log("Sounds ID -> ", soundID);
      Sounds.update({'_id':soundID}, {$set:{'played':true, 'playing': false}});
    },
    isPlaying: function(){
      var soundsCount = Sounds.find({'playing': true}).count();
      return soundsCount > 0
    }
  });

}
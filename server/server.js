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
      console.log(randomTime);
      People.update({'_id': person._id}, {$set:{'fishTime':randomTime}});
      var chance = Random.fraction() * 100;

      var fishList = [
        {
        'name': 'blue',
        'chance': 80
        },
        {
          'name': 'gold',
          'chance': 3
        },
        {
          'name': 'red',
          'chance': 70
        },
        {
          'name': 'blue',
          'chance': 50
        },
        {
          'name': 'pink',
          'chance': 13
        }
      ]

      var fish = Random.choice(fishList)

      if (fish.chance >= chance){
        outMsg = '@'+person['name'] + " caught " + fish.name + ' fish!';
        People.update({'_id': person._id}, {$push: {'fishes': fish.name}});
      } else {
        outMsg = '@'+person['name'] + " just lost a " + fish.name + ' fish!';
      }

      var obj = {
        'message': outMsg,
        'userid': person._id
      }

      Meteor.setTimeout(function(){
        People.update({'_id': obj.userid}, {$set:{'fishing':false}});

        var payload = {
            "token":slack_api_token,
            "channel":'G046CUH0D',
            "text": obj.message,
            "icon_emoji": ':ghost:',
            "username": "Draco (Ghost)",
            'parse':"full"
        }
        var result = HTTP.call("GET", url, {params: payload});

      }, randomTime, obj);
      message = 'FISH MESSAGE!!!'
    }
  });

}
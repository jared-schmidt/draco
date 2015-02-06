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
    }
  });

}
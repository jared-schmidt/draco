test = {
    start:function(slack){
        message = 'Hello world!';
        var slack_api_token = Meteor.settings['slack_api_token'];
        var url = 'https://slack.com/api/chat.postMessage';

        var person = People.findOne({'id': slack['slack_id']});

        var payload = {
            "token":slack_api_token,
            "channel":'@'+person['name'],
            "text": "Hello World",
            "icon_emoji": ':ghost:',
            "username": "Draco (Ghost)",
            'parse':"full"
        }
        var result = HTTP.call("GET", url, {params: payload});

        return message;
    }
}

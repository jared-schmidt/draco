rtmstart = {
    start:function(slack){
        slack['text'] = slack['text'].replace(' ', ',')
        var url = 'https://slack.com/api/rtm.start';
        var payload = {
            "token":Meteor.settings['slack_api_token']
        }

        var result = HTTP.call("GET", url, {params: payload});
        var WebSocket = Meteor.npmRequire('ws');

        ws = new WebSocket(result.data['url']);
        ws.on('open', function() {
            console.log("open");
        });

        ws.on('message', function(message) {
            console.log(message);
            console.log('received:');
            var payload = {
                "id": 1,
                "type": "message",
                "channel": message['channel'],
                "text": "Hello world"
            }
            ws.send(payload);
        });

        message = "started?";
        return message;
    }
}

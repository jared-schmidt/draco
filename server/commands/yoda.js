yoda = {
    start:function(slack){
        console.log("YODA TIME");
        slack['text'] = slack['text'].replace(' ', ',')
        var url = 'https://yoda.p.mashape.com/yoda?'+q_string({'sentence':slack['text']});

        var req = HTTP.call('GET', url, {
            headers: {"X-Mashape-Key":"YjLol59rpLmshzaZJN8rXDlSw0ltp1hayXtjsnnmCnMD88tH16"}
        });

        var url = 'https://slack.com/api/chat.postMessage';
        var slack_api_token = Meteor.settings['slack_api_token'];

        var payload = {
            "token":slack_api_token,
            "channel":slack['channel_id'],
            "text": req.content,
            "username": "Yoda",
            "icon_emoji": ':hamster:'
        }
        var result = HTTP.call("GET", url, {params: payload});
        message = "Sent";

        return message;
    }
}

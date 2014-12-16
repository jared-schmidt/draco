function outgoing_bot(message, channel){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = 'xoxp-3027284929-3033279105-3192423814-fdc13f';

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": message,
        "icon_emoji": ':ghost:',
        "username": "Draco (Ghost)"
    }
    var result = HTTP.call("GET", url, {params: payload});
}

function get_call(url){
    var req = Meteor.http.get(url);
    return req.data;
}
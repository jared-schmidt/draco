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

table = {
    start:function(slack){
        var url = 'http://tableflipper.com/json';
        var j_data = get_call(url);
        try{
            var url = j_data['gif'];
            outgoing_bot('called by: '+ slack['slack_name'] + " " + url, slack['channel_id']);
            message = "Sent";
        } catch(err){
            if(err){
                console.log(err);
            }
            message = 'failed to find a table.';
        }
        return message;
    }
}
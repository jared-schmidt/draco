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

//Converts text to use in query string
function q_string(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

sticker = {
    start:function(slack){
        var offset = Math.floor((Math.random() * 10) + 1); //random number between 1 and 10
        var url = 'http://api.giphy.com/v1/stickers/search?'+q_string({'q':slack['text']})+'&api_key=dc6zaTOxFJmzC&limit=1&offset=0';
        var j_data = get_call(url);
        try{
            var url = j_data['data'][0]['images']['fixed_height']['url'];
            outgoing_bot('called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
            message = "Sent";
        } catch(err){
            if(err){
                console.log(err);
            }
            message = 'failed to find sticker.';
        }
        return message;
    }
}

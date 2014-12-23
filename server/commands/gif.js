gif = {
    start:function(slack){
        var offset = Math.floor((Math.random() * 10) + 1); //random number between 1 and 10
        var giphy_token = Meteor.settings['giphy_public_token'];
        var url = 'http://api.giphy.com/v1/gifs/translate?'+q_string({'s':slack['text']})+'&api_key='+giphy_token+'&limit=1&offset='+offset
        var j_data = get_call(url);
        var limit = 10;
        try{
            People.update({'id': slack['slack_id']}, {$inc:{"gifs": 1}});
            var person = People.findOne({'id':slack['slack_id']});
            if (person.gifs <= limit){
                var url = j_data['data']['images']['original']['url'];
                outgoing_bot('called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
                message = "Sent. " + (limit - person.gifs).toString() + " Gifs left.";
            }else{
                message = "Limit reached";
            }
        } catch(err){
            message = 'failed to find image.';
        }
        return message;
    }
}

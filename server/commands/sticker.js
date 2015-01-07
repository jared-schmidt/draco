sticker = {
    start:function(slack){
        var offset = Math.floor((Math.random() * 10) + 1); //random number between 1 and 10
        var giphy_token = Meteor.settings['giphy_public_token'];
        var url = 'http://api.giphy.com/v1/stickers/search?'+q_string({'q':slack['text']})+'&api_key='+giphy_token+'&limit=1&offset=0';
        var j_data = get_call(url);
        try{
            var url = j_data['data'][0]['images']['fixed_height']['url'];
            outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
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

robot = {
    start:function(slack){
        var url = 'http://robohash.org/'+text_to_url(slack['text']);
        var j_data = get_call(url);
        try{
            outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] + " " + url, slack['channel_id']);
            message = "Sent";
        }catch(err){
            message = 'failed to find image.';
        }
        return message;
    }
}

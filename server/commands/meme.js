meme = {
    start:function(slack){
        var text = slack['text'].split('|')
        var url = 'http://apimeme.com/meme?'+q_string({'top':text[0]})+'&'+q_string({'bottom':text[1]})
        try{
            outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] +" " + url, slack['channel_id']);
            message = "Sent";
        } catch(err){
            message = 'failed to find image.';
        }
        return message;
    }
}

xkcd = {
    start:function(slack){
        var url = 'http://xkcd.com/info.0.json';
        var j_data = get_call(url);
        try{
            outgoing_bot(slack['slack_id'], 'xkcd #'+j_data.num+': ' + j_data.title, slack['channel_id']);
            outgoing_bot(slack['slack_id'], j_data.img, slack['channel_id']);

            if (j_data.alt){
                outgoing_bot(slack['slack_id'], j_data.alt, slack['channel_id']);
            }
            if (j_data.news){
                outgoing_bot(slack['slack_id'], j_data.news, slack['channel_id']);
            }
            message = "Found comic."
        }catch(err){
            message = 'failed to find comic.';
        }
        return message;
    }
};

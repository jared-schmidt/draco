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
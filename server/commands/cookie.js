cookie = {
    start:function(slack){
        // var url = 'http://private-anon-2a0672222-fortunecookie.apiary-proxy.com/v1/cookie';
        // var j_data = get_call(url);
        try{
            // var fortune = j_data[0]['fortune'];
            // outgoing_bot('called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
            // message = fortune['message'];
            message = "No cookie for you!";
        }catch(err){
            message = 'failed to find fortune cookie.';
        }
        return message;
    }
};

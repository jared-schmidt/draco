randomword = {
    start:function(slack){
        var url = 'http://randomword.setgetgo.com/get.php';
        try{
            // outgoing_bot('called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
            message = Meteor.http.get(url).content;
        }catch(err){
            message = 'failed to find fortune cookie.';
        }
        return message;
    }
}

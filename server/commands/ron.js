ron = {
    start:function(slack){
        var url = 'http://ron-swanson-quotes.herokuapp.com/quotes';
        var j_data = get_call(url);
        try{
            console.log(j_data['quote']);
            var fortune = j_data['quote'];
            other_bot(fortune, slack['channel_id'], "Ron Swanson", ":hamburger:")
            message = "Called";
        }catch(err){
            message = 'failed to find ron.';
        }
        return message;
    }
};

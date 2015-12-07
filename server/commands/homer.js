homer = {
    start:function(slack){
        try{

            outgoing_bot(slack['slack_id'], 'http://dracobot.meteor.com/images/homer1.gif', slack['channel_id']);
            message = "Sent.";

        } catch(err){
            console.log(err);
            message = 'failed to find image.';
        }
        return message;
    }
};

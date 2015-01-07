deletemsg = {
    start:function(slack){
        try{
            var deleted = delete_message(slack['slack_id']);
            if (deleted){
                message = "deleted message";
            }else{
                message = "failed to delete.";
            }
        }catch(err){
            message = 'failed to delete message.';
        }
        return message;
    }
}

deletemsg = {
    start:function(slack){
        try{
            var deleted = delete_message(slack['slack_id']);
            console.log(deleted);
            if (deleted){
                var didDrop = DashboardImages.drop();
                console.log(didDrop);
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

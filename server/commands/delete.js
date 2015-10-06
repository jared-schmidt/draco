deletemsg = {
    start:function(slack){
        try{
            var deleted = delete_message(slack['slack_id']);
            var imgObj = {
                "addedBy": "",
                "url": "/images/pony.jpg",
                "text": "",
                "addedOn": new Date()
            }
            DashboardImages.insert(imgObj);
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

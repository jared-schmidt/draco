table = {
    start:function(slack){
        var url = 'http://tableflipper.com/json';
        var j_data = get_call(url);
        try{
            var url = j_data['gif'];
            outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] + " " + url, slack['channel_id']);
            var person = People.findOne({'id': slack['slack_id']});
            var imgObj = {
                "addedBy": person['name'],
                "url": url,
                "text": slack['text'],
                "addedOn": new Date()
            }
            DashboardImages.insert(imgObj);
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

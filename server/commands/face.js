face = {
    start:function(slack){
        slack['text'] = slack['text'].replace(' ', ',')
        var url = 'http://alltheragefaces.com/api/search/'+ slack['text'];
        var j_data = get_call(url);
        var offset = Math.floor((Math.random() * j_data.length-1) + 1);
        try{
            var url = j_data[offset]['png'];
            outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
            var person = People.findOne({'id': slack['slack_id']});
            var imgObj = {
                "addedBy": person['name'],
                "url": url,
                "text": slack['text'],
                "addedOn": new Date()
            }
            DashboardImages.insert(imgObj);
            message = "Sent";
        }catch(err){
            message = 'failed to find image.';
        }
        return message;
    }
}

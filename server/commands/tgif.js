tgif = {
    start:function(slack){
        var giphy_token = Meteor.settings['giphy_public_token'];
        var rating = 'pg-13';
        var url = 'http://api.giphy.com/v1/gifs/translate?'+q_string({'s':slack['text']})+'&api_key='+giphy_token+'&limit=1&rating='+rating;
        var j_data = get_call(url);
        var limit = 10;
        try{
            // LIMIT COMMENTED OUT

            // People.update({'id': slack['slack_id']}, {$inc:{"gifs": 1}});
            // var person = People.findOne({'id':slack['slack_id']});
            // if (person.gifs <= limit){
                var url = j_data['data']['images']['original']['url'];
                outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] + " Translate: " + slack['text'] +" " + url, slack['channel_id']);
                // message = "Sent. " + (limit - person.gifs).toString() + " Gifs left.";
                var person = People.findOne({'id': slack['slack_id']});
                var imgObj = {
                    "addedBy": person['name'],
                    "url": url,
                    "text": slack['text'],
                    "addedOn": new Date()
                }
                DashboardImages.insert(imgObj);
                message = "Sent.";
            // }else{
                // message = "Limit reached";
            // }
        } catch(err){
            console.log(err);
            message = 'failed to find image.';
        }
        return message;
    }
}

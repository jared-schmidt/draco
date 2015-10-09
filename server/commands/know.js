know = {
    start:function(slack){
        try{

            // var person = People.findOne({'id': slack['slack_id']});

            imgObj = {
                "addedBy": "YOU",
                "url": "http://i.giphy.com/R6bDgXEXCLcIw.gif",
                "text": "",
                "addedOn": new Date()
            }

            DashboardImages.insert(imgObj);

            Meteor.call('pushSound', "KNOW", 'http://dracobot.meteor.com/sounds/knowMore.mp3', 'en', false);
            // outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
            message = "Sent.";

        } catch(err){
            console.log(err);
            message = 'failed to find image.';
        }
        return message;
    }
}

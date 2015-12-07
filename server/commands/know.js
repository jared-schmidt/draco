know = {
    start:function(slack){
        try{

            // var person = People.findOne({'id': slack['slack_id']});

            var url = 'http://i.giphy.com/R6bDgXEXCLcIw.gif';

            // imgObj = {
            //     "addedBy": "YOU",
            //     "url": url,
            //     "text": "",
            //     "addedOn": new Date()
            // }
            //
            // DashboardImages.insert(imgObj);

            // Meteor.call('pushSound', "KNOW", 'http://dracobot.meteor.com/sounds/knowMore.mp3', 'en', false);
            outgoing_bot(slack['slack_id'], url, slack['channel_id']);
            message = "Sent.";

        } catch(err){
            console.log(err);
            message = 'failed to find image.';
        }
        return message;
    }
}

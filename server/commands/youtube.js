youtube = {
    start:function(slack){
        var person = People.findOne({'id': slack['slack_id']});
        console.log("Adding -> " + slack['text']);
        // TODO: Add check for URL
        if(slack['text']){
            console.log("Adding video");
            message =  "Adding video";
            var youtubeObj = {
                "addedBy": person['name'],
                "url": slack['text'],
                "addedOn": new Date()
            }
            YoutubeVideos.insert(youtubeObj);

        }else{
            console.log("did not add video");
            message = "Need a video URL";
        }
        return message;
    }
}

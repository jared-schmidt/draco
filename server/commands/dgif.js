dgif = {
    start:function(slack){
        // var person = People.findOne({'id': slack['slack_id']});
        // console.log("Adding -> " + slack['text']);
        // // TODO: Add check for URL
        // if(slack['text']){
        //     console.log("Adding video");
        //     message =  "Adding video";
        //     var youtubeObj = {
        //         "addedBy": person['name'],
        //         "url": slack['text'],
        //         "addedOn": new Date()
        //     }
        //     YoutubeVideos.insert(youtubeObj);
        //
        // }else{
        //     console.log("did not add video");
        //     message = "Need a video URL";
        // }
        // return message;


        // var offset = Math.floor((Math.random() * 10) + 1); //random number between 1 and 10
        // var giphy_token = Meteor.settings['giphy_public_token'];
        // var rating = 'pg-13';
        // var url = "";
        // var j_data = null;
        var lastIndexOfImg = slack['text'].lastIndexOf('.');
        var sliceText = slack['text'].slice(lastIndexOfImg + 1, slack['text'].length);
        var imgUrl;
        switch(sliceText){
          case "gif":
            imgUrl = slack['text'];
            break;
          case "jpg":
            imgUrl = slack['text'];
            break;
          case "jpeg":
            imgUrl = slack['text'];
            break;
          case "png":
            imgUrl = slack['text'];
            break;
          case "flif":
            imgUrl = slack['text'];
            break;
          case "tiff":
            imgUrl = slack['text'];
            break;
          case "bmp":
            imgUrl = slack['text'];
            break;
          default:
            imgUrl = null;
            break;

        }

        try{
            // LIMIT COMMENTED OUT

            // People.update({'id': slack['slack_id']}, {$inc:{"gifs": 1}});
            // var person = People.findOne({'id':slack['slack_id']});
            var person = People.findOne({'id': slack['slack_id']});
            // if (person.gifs <= limit){
            var imgObj = {}
            if(imgUrl != null){
                imgObj = {
                    "addedBy": person['name'],
                    "url": imgUrl,
                    "text": slack['text'],
                    "addedOn": new Date()
                }
            }
            else{
              imgObj = {
                "addedBy": person['name'],
                "url": 'public/images/error_FileNotFound.png',
                "text": slack['text'],
                "addedOn": new Date()
              }
            }
                DashboardImages.insert(imgObj);
                // outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
                // message = "Sent. " + (limit - person.gifs).toString() + " Gifs left.";
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

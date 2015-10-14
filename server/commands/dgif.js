dgif = {
    start:function(slack){


        var lastIndexOfImg = slack['text'].lastIndexOf('.');
        var sliceText = slack['text'].slice(lastIndexOfImg + 1, slack['text'].length);
        var imgUrl;
        var returnText;
        switch(sliceText){
          case "gif":
            imgUrl = slack['text'];
            returnText = "sent from dgif";
            break;
          case "jpg":
            imgUrl = slack['text'];
            returnText = "sent from dgif";
            break;
          case "jpeg":
            imgUrl = slack['text'];
            returnText = "sent from dgif";
            break;
          case "png":
            imgUrl = slack['text'];
            returnText = "sent from dgif";
            break;
          case "flif":
            imgUrl = slack['text'];
            returnText = "sent from dgif";
            break;
          case "tiff":
            imgUrl = slack['text'];
            returnText = "sent from dgif";
            break;
          case "bmp":
            imgUrl = slack['text'];
            returnText = "sent from dgif";
            break;
          default:
            var offset = Math.floor((Math.random() * 10) + 1); //random number between 1 and 10
            var giphy_token = Meteor.settings['giphy_public_token'];
            var rating = 'pg-13';
            var url = 'http://api.giphy.com/v1/gifs/search?'+q_string({'q':slack['text']})+'&api_key='+giphy_token+'&limit=1&rating='+rating+'&offset='+offset;
            var j_data = get_call(url);
            imgUrl = j_data['data'][0]['images']['original']['url'];
            returnText = slack['text'];
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
                    "text": returnText,
                    "addedOn": new Date()
                }
            }
            else{
              imgObj = {
                "addedBy": person['name'],
                "url": '/images/error_FileNotFound.png',
                "text": "Error",
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

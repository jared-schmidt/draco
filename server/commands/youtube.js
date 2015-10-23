youtube = {
    start:function(slack){
      try{
        var person = People.findOne({'id': slack['slack_id']});
        var videoObj = {};
        videoObj.url = slack['text'];
        videoObj.addedBy = person["name"];
        YoutubeVideos.insert(videoObj);
        message = "Sent.";
      } catch(err){
          console.log(err);
          message = 'failed to play video.';
      }
      return message;
    }
}

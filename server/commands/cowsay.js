cowsay = {
  start:function(slack){
    var url = "http://cowsay.morecode.org/say?format=text&" + q_string({'message':slack['text']});
    var req = Meteor.http.get(url);
    try{
      other_bot(req.content, slack['channel_id'], "Larry the Cow", ":cow:")
      message = 'Sent';
    }catch(err){
      message = 'failed to find cow.';
    }
    return message;
  }
}

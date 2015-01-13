quote = {
  start:function(slack){
    var url = 'http://www.iheartquotes.com/api/v1/random?format=json';
    var j_data = get_call(url);
    try{
      message = j_data['quote'];
    }catch(err){
      message = 'failed to find quote.';
    }
    return message;
  }
}

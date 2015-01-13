numberfact = {
  start:function(slack){
    var url = "http://numbersapi.com/random?json";
    var j_data = get_call(url);
    try{
      message = j_data['text'];
    }catch(err){
      message = 'failed to find fact.';
    }
    return message;
  }
}

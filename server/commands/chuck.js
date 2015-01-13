chuck = {
  start:function(slack){
    var url = 'http://api.icndb.com/jokes/random';
    var j_data = get_call(url);
    try{
      other_bot(j_data['value']['joke'], slack['channel_id'], "Chuck", ":muscel:")
      message = 'Sent';
    }catch(err){
      message = 'failed to find chuck.';
    }
    return message;
  }
}

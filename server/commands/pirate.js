pirate = {
  start:function(slack){
    var url = "http://isithackday.com/arrpi.php?format=json&" + q_string({'text':slack['text']});
    var j_data = get_call(url);
    try{
      // console.log(j_data);
      other_bot(j_data['translation']['pirate'], slack['channel_id'], "Heidy the Pirate", ":heidy:")
      message = 'Sent';
    }catch(err){
      message = 'failed to find the Pirate.';
    }
    return message;
  }
}

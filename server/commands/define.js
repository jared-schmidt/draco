define = {
  start:function(slack){
    var token = Meteor.settings['words_token'];
    var url = 'https://www.wordsapi.com/words/'+slack['text']+'?accessToken='+token;
    var j_data = get_call(url);
    try{
      // outgoing_bot('called by: '+ slack['slack_name'] + " Searched: " + slack['text'] +" " + url, slack['channel_id']);
      message = j_data['results'][0]['definition'];
    }catch(err){
      message = 'failed to find definition.';
    }
    return message;
  }
}

readnumfact = {
  start:function(slack){
    var url = "http://numbersapi.com/random?json";
    var j_data = get_call(url);
    var lang = 'en_gb';
    var pitch = 0;
    var rate = 1;

    try{
      message = j_data.text;
      Meteor.call('pushSound', slack.slack_name + ' numfact', message, lang, true, pitch, rate);
    }catch(err){
      message = 'failed to find fact.';
    }
    return message;
  }
};

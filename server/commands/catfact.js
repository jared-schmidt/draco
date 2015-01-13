catfact = {
  start:function(slack){
    var url = 'http://catfacts-api.appspot.com/api/facts?number=1';
    var req = Meteor.http.get(url);
    var j_data = JSON.parse(req.content);

    try{
      message = j_data['facts'][0];
    }catch(err){
      message = 'failed to find cat fact.';
    }
    return message;
  }
}

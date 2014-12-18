outgoing_bot = function (message, channel){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = Meteor.settings['slack_api_token'];

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": message,
        "icon_emoji": ':ghost:',
        "username": "Draco (Ghost)",
        'parse':"full"
    }
    var result = HTTP.call("GET", url, {params: payload});
}

get_call = function (url){
    var req = Meteor.http.get(url);
    return req.data;
}

get_person_name = function (text){
    var person_name = String(text.split(' ')[0]);
    person_name = person_name.replace(',', '');
    person_name = person_name.replace('@', '');
    return person_name.trim();
}

get_slack_users = function (){
    var slack_token = Meteor.settings['slack_api_token'];
    var url = 'https://slack.com/api/users.list?token='+slack_token+'&pretty=1'
    var req = Meteor.http.get(url);
    var j_data =req.data;
    return j_data['members'];
}

//Converts text to use in query string
q_string = function (obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


person_bot = function (message, channel, name, icon){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = Meteor.settings['slack_api_token'];

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": message,
        "username": name,
        "icon_url": icon
    }
    var result = HTTP.call("GET", url, {params: payload});
}

// Another way this file could be written
Meteor.helpers = {
    testHelper : function(){
        console.log("This is a test helper");
    }
}

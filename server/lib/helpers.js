outgoing_bot = function (user_id, message, channel){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = Meteor.settings['slack_api_token'];

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": message,
        "icon_emoji": ':panda_face:',
        "username": "Draco (Ghost Zombie)",
        'parse':"full"
    }
    var result = HTTP.call("GET", url, {params: payload});
    if(result.data['ok']){
        People.update({'id': user_id}, {$set:{"message_time": result.data['ts']}});
        People.update({'id': user_id}, {$set:{"message_channel": result.data['channel']}});
    }
}

delete_message = function(user_id){
    var person = People.findOne({'id': user_id});

    var url = 'https://slack.com/api/chat.delete';
    var slack_api_token = Meteor.settings['slack_api_token'];

    var payload = {
        'token': slack_api_token,
        'ts': person['message_time'],
        'channel': person['message_channel']
    }
    var result = HTTP.call("GET", url, {params: payload});

    // console.log(result.data);
    return result.data['ok']
}

get_call = function (url){
    var req = Meteor.http.get(url);
    return req.data;
}

post_call = function(url, payload){
    var req = HTTP.post(url, {params: payload});
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


person_bot = function (message, channel, name, icon_url){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = Meteor.settings['slack_api_token'];

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": message,
        "username": name,
        "as_user": true,
        "icon_url": icon_url
    }
    var result = HTTP.call("GET", url, {params: payload});
}

other_bot = function (message, channel, name, icon){
  var url = 'https://slack.com/api/chat.postMessage';
  var slack_api_token = Meteor.settings['slack_api_token'];

  var payload = {
    "token":slack_api_token,
    "channel":channel,
    "text": message,
    "username": name,
    "icon_emoji": icon
  }
  var result = HTTP.call("GET", url, {params: payload});
}

text_to_url = function(text){
    return text.split(" ").join("%20");
}

// Another way this file could be written
Meteor.helpers = {
    testHelper : function(){
        console.log("This is a test helper");
    }
}

function get_slack_users(){
    var url = 'https://slack.com/api/users.list?token=xoxp-3027284929-3033279105-3192423814-fdc13f&pretty=1'
    var req = Meteor.http.get(url);
    var j_data =req.data;
    return j_data['members'];
}

function get_person_name(text){
    var person_name = String(text.split(' ')[0]);
    person_name = person_name.replace(',', '');
    person_name = person_name.replace('@', '');
    return person_name.trim();
}


function person_bot(message, channel, name, icon){
    var url = 'https://slack.com/api/chat.postMessage';
    var slack_api_token = 'xoxp-3027284929-3033279105-3192423814-fdc13f';

    var payload = {
        "token":slack_api_token,
        "channel":channel,
        "text": message,
        "username": name,
        "icon_url": icon
    }
    var result = HTTP.call("GET", url, {params: payload});
}


personbot = {
    start:function(slack){
        var text = slack['text'];
        var people = get_slack_users();

        var person_name = get_person_name(text);

        var person = '';

        for(var i=0;i<people.length;i++){
            if(people[i].name == person_name){
                person = people[i];
            }
        }

        if(person != ''){
            name = person_name;
            icon = person['profile']['image_32'];
            text = text.replace(person_name, '');
            text = text.trim();
            person_bot(text, slack['channel_id'], name, icon)
            message = "Sent message as " + person_name;
        }else{
            message = "Found no one";
        }

        return message;
    }
}

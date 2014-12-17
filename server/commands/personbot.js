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
            text = text.replace('@','');
            text = text.trim();
            person_bot(text, slack['channel_id'], name, icon)
            message = "Sent message as " + person_name;
        }else{
            message = "Found no one";
        }

        return message;
    }
}

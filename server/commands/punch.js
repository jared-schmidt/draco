punch = {
    start:function(slack){
        var person_name = get_person_name(slack['text']);
        if(person_name != slack['slack_name']){

            var person_from = People.findOne({'id': slack['slack_id']});

            var person_to = People.findOne({'name': person_name});

            if(person_to){
                People.update({'_id': person_to._id}, {$inc:{'punched':1}});
                outgoing_bot(slack['slack_id'], "@"+person_from['name']  + " punched @"+ person_name, slack['channel_id']);
                message = "KO";
            }else{
                message = "Failed to find person.";
            }
        }else{
            outgoing_bot(slack['slack_id'], "@"+person_name + " tried to punched themself." , slack['channel_id']);
            message = "Can't punch yourself!";
        }
        return message;
    }
}

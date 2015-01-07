star = {
    start:function(slack){
        var person_name = get_person_name(slack['text']);
        if(person_name != slack['slack_name']){
            var person = People.findOne({'name': person_name});

            if(person){
                People.update({'_id': person._id}, {$inc:{'goldstar':1}});
                message = 'Gave Star';
                outgoing_bot(slack['slack_id'], "@"+person_name + " has recived a goldstar.", slack['channel_id']);
            }else{
                message = "Failed to find person.";
            }
        }else{
            message = "Can't give a goldstar to yourself!";
        }
        return message;
    }
}

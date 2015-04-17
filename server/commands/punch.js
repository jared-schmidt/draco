punch = {
    start:function(slack){
        var person_name = get_person_name(slack['text']);
        if(person_name != slack['slack_name']){

            var person_from = People.findOne({'id': slack['slack_id']});

            var person_to = People.findOne({'name': person_name});
            var outmsg = "";
            if(person_to){
                if (person_name.toLowerCase() == 'draco'){
                    console.log("Tired to punch draco");
                    outmsg = "@" + person_name + " blocked " + "@"+person_from['name'] + " and @" + person_name + " punched " + "@"+person_from['name'];
                    People.update({'_id': person_from._id}, {$inc:{'punched':1}});
                } else {
                    console.log("pucnhed someone else");
                    outmsg =  "@"+person_from['name']  + " punched @"+ person_name;
                    People.update({'_id': person_to._id}, {$inc:{'punched':1}});
                }
                console.log(outmsg)
                outgoing_bot(slack['slack_id'], outmsg, slack['channel_id']);
                message = "KO";
            }else{
                message = "Failed to find person.";
            }
        }else{
            outgoing_bot(slack['slack_id'], "@"+person_name + " tried to punched themself." , slack['channel_id']);
            message = "Now everyone knows!";
        }
        return message;
    }
}

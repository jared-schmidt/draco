welcome = {
   start:function(slack){
       var person_name = get_person_name(slack['text']);
        outgoing_bot(slack['slack_id'], "@"+person_name + " wets the bed." , slack['channel_id']);
       message = "Now everyone knows!";
       return message;
   }
}

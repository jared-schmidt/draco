test = {
    start:function(slack){
       
       People.update({'id': slack['slack_id']}, {$set:{'defaultTalk': slack['text']}});
       
       return "Good luck and may the Force be with you!";
    }
}

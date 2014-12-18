refreshdb = {
    start:function(slack){
        var people = get_slack_users();
        var count = 0;
        for(var i=0;i<people.length;i++){
            var person = People.findOne({'name': people[i].name});
            if (!person){
                People.insert(people[i]);
                People.update({'name': people[i].name}, {$set:{'goldstar': 0}});
                count = count + 1;
            }
        }
        message = 'Updated '+ count +' people';
        return message;
    }
}

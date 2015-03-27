roulette = {
    start:function(slack){

        var people = get_slack_users();
        var random = Math.floor((Math.random() * people.length + 0));
        var person = people[random];
        message = person.profile.real_name;

        return message;
    }
};

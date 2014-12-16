mystars = {
    start:function(slack){
        var person = People.findOne({'name': slack['slack_name']});
        return "You have " + person.goldstar + " goldstars!";
    }
}

fish = {
    start:function(slack){
        var text = slack['text'];
        var message = "Something didn't work correctly...";
        if (text.length > 0){
            var command = String(text.split(' ')[0]);
            command = command.replace(',', '');
            command = command.trim();
            command = command.toLowerCase();

            if (command){
                text = text.replace(command, '');
                text = text.trim();
                switch(command){
                    case 'cast':
                        message = fish.cast(slack['slack_id']);
                        break;
                    case 'reel':
                        fish.reel(slack['slack_id']);
                        message = "Reset line!";
                        break;
                    case 'fishes':
                        message = "You have " + fish.fishes(slack['slack_id']) + " fish(es).";
                        break;
                    default:
                        message = "Yeah, that isn't a command.";
                        break;
                }
            }
        }
        return message;
    },
    cast:function(slack_id){
        try{
            // var message = "Your line has been cast! Now let's wait to see what you catch!";
            var person = People.findOne({'id': slack_id});
            if (person.hasOwnProperty('fishing')){
                console.log("has prop");
                console.log(person.fishing)
                if(!person.fishing){
                    console.log("fishing");
                    People.update({'_id': person._id}, {$set:{'fishing':true}});
                    Meteor.call('caughtFish', person);
                    message = "You are now fishing!";
                } else {
                    console.log("already");
                    message = 'already fishing!';
                }
            } else {
                People.update({'_id': person._id}, {$set:{'fishing':false}});
            }

        }catch(err){
            if(err)
                console.log(err);
            message = 'failed to cast.';
        }
        return message;
    },
    'reel': function(slack_id){
        People.update({'_id': slack_id}, {$set:{'fishing': false}, $set:{'fishTime': -1}});
    },
    'fishes': function(slack_id){
        var person = People.findOne({'id': slack_id});
        var count = -1;
        if (person){
            count = person.fishes.length;
        }
        return count
    }
}

Game = new Meteor.Collection("game");


game = {
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
                    case 'question2':
                        question = game.question(slack['slack_id'], slack['channel_id']);
                        outgoing_bot(question, slack['channel_id']);
                        message = "Found Question";
                        break;
                    case 'answer':
                        message = game.answer(slack['slack_id'], text, slack['channel_id']);
                        break;
                    default:
                        message = "Yeah, that isn't a command.";
                        break;
                }
            }
        }
        return message;
    },
    question:function(slack_id, channel_id){
        var url = 'http://jservice.io/api/random';
        var j_data = get_call(url);
        try{
            var question = j_data[0]['question'];
            var answer = j_data[0]['answer'];
            var value = j_data[0]['value'];
            var category_id = j_data[0]['category_id'];
            var game_question = {
                'question_question': question,
                'question_answer': answer,
                'question_value':value,
                'question_category_id':category_id
            }
            question_id = Game.insert(game_question)
            People.update({},{$set:{'question_id': question_id}}, {'multi':true});
            outgoing_bot("First person to answer useing '/draco game answer {text}' gets " + value + " points.", channel_id);
            message = question;
        }catch(err){
            message = 'failed to find question.';
        }
        return message;
    },
    answer:function(slack_id, text, channel_id){
        person = People.findOne({'id':slack_id});
        question = Game.findOne({'_id':person.question_id});
        var answer = question.question_answer.toLowerCase();
        if (text){
            if (answer.indexOf(text.toLowerCase()) > -1 ){
                var correct_obj = {
                    'question_total': (parseInt(question.question_value) + parseInt(person.question_total))
                }
                People.update({'id':slack_id}, {$set:correct_obj});
                message = person.name + ' got it for ' + question.question_value + " points";
                outgoing_bot(message, channel_id);
                message = "Good Job!";
                question = game.question(slack_id, channel_id);
                outgoing_bot(question, slack['channel_id']);
            }else{
                message = "Guess again";
            }
        }else{
            message = "No answer was given!";
        }
        return message;
    }
}

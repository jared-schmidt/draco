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
                    case 'question':
                        message = game.question(slack['slack_id']);
                        break;
                    case 'answer':
                        message = game.answer(slack['slack_id'], text);
                        break;
                    default:
                        message = "Yeah, that isn't a command.";
                        break;
                }
            }
        }
        return message;
    },
    question:function(slack_id){
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
            People.update({'id':slack_id}, {$set:game_question});
            message = question;
        }catch(err){
            message = 'failed to find image.';
        }
        return message;
    },
    answer:function(slack_id, text){
        person = People.findOne({'id':slack_id});
        var answer = person.question_answer;
        if (text){
            if (answer.indexOf(text) > -1 ){
                var correct_obj = {
                    'question_total': (parseInt(person.question_value) + parseInt(person.question_total)),
                    'question_value':0,
                    'question_answer': 192
                }
                People.update({'id':slack_id}, {$set:correct_obj});
                message = 'Good job!';
            }else{
                message = "Guess again";
            }
        }else{
            message = "No answer was given!";
        }
        return message;
    }
}

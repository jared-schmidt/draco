steve = {
    start:function(slack){
        var text = slack['text'];
        var message = "Sent";

        images = [
            'http://dracobot.meteor.com/images/watching.jpg',
            'http://dracobot.meteor.com/images/pony.jpg',
            'http://dracobot.meteor.com/images/hug.jpg',
            'http://dracobot.meteor.com/images/dance.jpg',
            'http://dracobot.meteor.com/images/steve.jpg',
            'http://dracobot.meteor.com/images/polka.jpg'
        ]


        if (text.length > 0){
            message = "failed to work..."
            var command = String(text.split(' ')[0]);
            command = command.replace(',', '');
            command = command.trim();
            command = command.toLowerCase();



            if (command){
                text = text.replace(command, '');
                text = text.trim();
                switch(command){
                    case 'watch':
                        image = 'http://dracobot.meteor.com/images/watching.jpg'
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'pony':
                        image = 'http://dracobot.meteor.com/images/pony.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'hug':
                        image = 'http://dracobot.meteor.com/images/hug.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'dance':
                        image = 'http://dracobot.meteor.com/images/dance.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'yes':
                        image = 'http://dracobot.meteor.com/images/yes.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'no':
                        image = 'http://dracobot.meteor.com/images/no.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'steve':
                        image = 'http://dracobot.meteor.com/images/steve.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'goodbye':
                        image = 'http://dracobot.meteor.com/images/goodbye.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'polka':
                        image = 'http://dracobot.meteor.com/images/polka.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    case 'newsteve':
                        image = 'http://dracobot.meteor.com/images/newsteve.jpg';
                        outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                        break;
                    default:
                        message = "I have no clue.";
                        break;
                }
            }
        }else {
                var offset = Math.floor((Math.random() * images.length-1) + 1);
                image = images[offset]
                outgoing_bot(slack['slack_id'], image, slack['channel_id']);
                message = "random steve meme";
            }
        return message;
    }
}

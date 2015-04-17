sound = {
    start:function(slack){
        var text = slack['text'];

        if (text.length > 0){
            message = "failed to work..."
            var command = String(text.split(' ')[0]);
            command = command.replace(',', '');
            command = command.trim();
            command = command.toLowerCase();
            var url = null;
            var base_url = 'http://dracobot.meteor.com/sounds/';
            if (command){
                text = text.replace(command, '');
                text = text.trim();
                switch(command){
                    case 'died':
                        url = base_url + 'died.mp3';
                        message = 'Oh, No!';
                        break;
                    case 'train':
                        url = base_url + 'train.mp3';
                        message = 'Hear comes the train!';
                        break;
                    case 'gameover':
                        url = 'http://themushroomkingdom.net/sounds/wav/smb/smb_gameover.wav';
                        message = 'Everyone lose!';
                        break;
                    case '1up':
                        url = 'http://themushroomkingdom.net/sounds/wav/smb/smb_1-up.wav';
                        message = 'Go you!';
                        break;
                    case 'coin':
                        url = 'http://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav';
                        message = 'You be rich!'
                        break;
                    case 'jump':
                        url = 'http://themushroomkingdom.net/sounds/wav/smb/smb_jump-small.wav';
                        message = "Up you go!";
                        break;
                    default:
                        message = "Is that a sound?";
                        break;
                }
            }

            if(url){
                Meteor.call('pushSound', url);
            } else {
                message = "Lost the sound somewhere?";
            }


        } else {
            message = 'Select a sound to play';
        }
        return message;
    }
}

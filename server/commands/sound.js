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
                    case 'yahoo':
                        url = base_url + 'yahoo.mp3';
                        message = "Yahoo!";
                        break;
                    case '77days':
                        url = base_url + '77days.mp3';
                        message = "Noooooooooooooooooooooooo!";
                        break;
                    case 'bell':
                        url = base_url + 'bell.mp3';
                        message = "Lunch time?";
                        break;
                    case 'error':
                        url = base_url + 'error.mp3';
                        message = "...windows";
                        break;
                    case 'roar':
                        url = base_url + 'roar2.mp3';
                        message = 'RUN!';
                        break;
                    case 'clock':
                        url = base_url + 'clock.mp3';
                        message = "Time going slow?";
                        break;
                    case 'thunder':
                        url = base_url + 'thunder.mp3';
                        message = 'All the windows closed?';
                        break;
                    case 'lawandorder':
                        url = base_url + 'lawandorder.mp3';
                        message = "Order! Order in the court!";
                        break;
                    case 'yep':
                        url = base_url + 'yep.mp3';
                        message = 'Yep!';
                        break;
                    case 'indeed':
                        url = 'http://www.pacdv.com/sounds/voices/yes-indeed.wav';
                        message = 'I agree.';
                        break;
                    case 'yes':
                        url = base_url + 'yes.mp3';
                        message = "yes";
                        break;
                    case 'no':
                        url = base_url + 'no.mp3';
                        message = 'no';
                        break;
                    case '1days':
                        url = base_url + '1days.mp3';
                        message = 'Nooo';
                        break;
                    case 'shutup':
                        url = base_url + 'shutup.mp3';
                        message = "You tell'em";
                        break;
                    case 'shallow':
                        url = base_url + 'shallow.mp3';
                        message = "ok then";
                        break;
                    case 'danger':
                        url = base_url + 'danger.mp3';
                        message = 'Danger ZONE!';
                        break;
                    case 'ants':
                        url = base_url + 'ants2.mp3';
                        message = "No one wants ants!";
                        break;
                    case 'gong':
                        url = base_url + 'gong.mp3';
                        message = 'OK';
                        break;
                    case 'scrach':
                        url = base_url + 'scrach.mp3';
                        message = 'Say what!';
                        break;
                    case 'cnlps':
                        console.log('cnlps');
                        url = base_url + 'cnlps1.mp3';
                        message = 'cnlps';
                        break;
                    case 'goodbye':
                        console.log('goodbye');
                        url = base_url + 'goodbye.mp3';
                        message = 'bye!';
                        break;
                    case 'bye':
                        url = base_url + 'bye.mp3';
                        message = 'bye!';
                        break;
                    case 'inception':
                        url = base_url + 'inception.mp3';
                        message = 'inception!';
                        break;
                    case 'ignorant':
                        url = base_url + 'ignorant.mp3';
                        message = 'ignorant';
                        break;
                    case 'home':
                        url = base_url + 'home.mp3';
                        message = 'home';
                        break;
                    case 'doh':
                        url = base_url + 'doh.mp3';
                        message = "D'OH!";
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

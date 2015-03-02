brownbag = {
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
                var key = create_key(slack['slack_id'])

                switch(command){
                    case 'connect':
                        message = brownbag.connect(key, text);
                        break;
                    case 'hello':
                        message = brownbag.hello(key);
                        break;
                    case 'winning':
                        message = brownbag.winning(key);
                        break;
                    case 'votes':
                        message = brownbag.votes(key);
                        break;
                    default:
                        message = "http://brown-bag.meteor.com/";
                        break;
                }
            }
        }
        return message;
    },
    connect:function(slack_id, email){
        var url = 'http://brown-bag.meteor.com/api/v2/connect';
        var payload = {
            'email' : email,
            'api_key': slack_id
        }
        var j_data = post_call(url, payload);
        var message = '';
        try{
            message = j_data['message'];
        }catch(err){
            if(err)
                console.log(err);
            message = 'failed to find email.';
        }
        return message;
    },
    hello:function(slack_id){
        var url = 'http://brown-bag.meteor.com/api/v2/hello';
        var payload = {
            'api_key': slack_id
        }
        var j_data = post_call(url, payload);
        var message = '';
        try{
            message = j_data['message'];
        }catch(err){
            if(err)
                console.log(err);
            message = 'failed to find user.';
        }
        return message;
    },
    winning:function(slack_id){
        var url = 'http://brown-bag.meteor.com/api/v2/winning';
        var payload = {
            'api_key': slack_id
        }
        var j_data = post_call(url, payload);
        var message = '';
        try{
            message = j_data['message'];
        }catch(err){
            if(err)
                console.log(err);
            message = 'failed to find user.';
        }
        return message;
    },
    votes: function(slack_id){
        var url = 'http://brown-bag.meteor.com/api/v2/votes';
        var payload = {
            'api_key': slack_id
        }
        var j_data = post_call(url, payload);
        var message = '';
        try{
            message = j_data['message'];
        }catch(err){
            if(err)
                console.log(err);
            message = 'failed to find user.';
        }
        return message;
    }
}

function create_key(slack_id){
    var Passphrase = Meteor.settings['AES_Passphrase'];

    return slack_id + Passphrase + (slack_id[1] * slack_id[5]);
    // var key = CryptoJS.AES.encrypt(slack_id, Passphrase);
    // console.log(key.toString());
    // return key.toString();
}
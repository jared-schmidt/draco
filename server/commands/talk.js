talk = {
    start:function(slack){
        var text = '';
        var lang = 'en_gb';
        var charLimit = 100;

        if (slack['text'].indexOf('|') > 0){
            var txtObj = slack['text'].split('|')
            text = txtObj[0];
            lang = txtObj[1];
        } else {
            text = slack['text'];
        }

        var stringToLong = text.length >= charLimit;

        if(text && !stringToLong){
            if (text[0] != '~'){
                text = text.replace('ding', 'dong');
            }
            text = text.replace('~', '');
            if (stringToLong){
                text = text.substring(0, 99);
                message = 'Auto cropped that message for you!';
            } else {
                message = 'Sent sound #' + Sounds.find({}).count();
            }
            Meteor.call('pushSound', slack['slack_name'], text, lang, true);
        }
        // } else if (text && stringToLong){
        //     message = "There is a "+ charLimit +" character limit. Your text is " + text.length + " character(s). That is " + (text.length - charLimit) + " character(s) to long.";
        // }
        else {
            message = "I can't say that!";
        }

        return message;
    }
}

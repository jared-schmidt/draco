talk = {
    start:function(slack){
        var text = '';
        var lang = 'en_gb';
        var charLimit = 100;

        var person = People.findOne({'id': slack['slack_id']});

        console.log(person);

        if (person.defaultTalk){
            lang = person.defaultTalk;
        }

        if (slack['text'].indexOf('|') > 0){
            var txtObj = slack['text'].split('|')
            text = txtObj[0];
            lang = txtObj[1];
        } else {
            text = slack['text'];
        }

        var stringToLong = text.length >= charLimit;

        if(text){
            // if (text[0] != '~'){
            //     text = text.replace('ding', 'dong');
            // }
            // text = text.replace('~', '');
            // if (stringToLong){
                // text = text.substring(0, 99);
                // message = 'Auto cropped that message for you!';
                // message = "NO MORE CROP";
            // } else {
                message = 'Sent sound #' + PastSounds.find({}).count() + ' character(s) of text ' + text.length;
            // }


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

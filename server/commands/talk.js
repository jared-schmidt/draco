talk = {
    start:function(slack){
        var text = '';
        var lang = 'en';
        if (slack['text'].indexOf('|') > 0){
            var txtObj = slack['text'].split('|')
            text = txtObj[0];
            lang = txtObj[1];
        } else {
            text = slack['text'];
        }

        if(text){
            Meteor.call('pushSound', slack['slack_name'], text, lang, true);
            message = "Sent";
        } else {
            message = "I can't say that!";
        }

        return message;
    }
}

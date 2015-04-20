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


        Meteor.call('pushSound', text, lang, true);

        message = "Sent";

        return message;
    }
}

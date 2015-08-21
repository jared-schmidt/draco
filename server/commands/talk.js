talk = {
    start:function(slack){
        var text = '';
        var lang = 'en_gb';
        var charLimit = 100;
        var pitch = 0;
        var rate = 1;

        var person = People.findOne({'id': slack.slack_id});

        // console.log(person);

        if (person.defaultTalk){
            lang = person.defaultTalk;
        }

        if (slack.text.indexOf('|') > 0){
            var txtObj = slack.text.split('|');
            text = txtObj[0];
            lang = txtObj[1];
            pitch = txtObj[2];
            rate = txtObj[3];
        } else {
            text = slack.text;
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
                var tags = '';
                try {
                  var nlp = Meteor.npmRequire('nlp_compromise');
                  var words = Meteor.npmRequire('offensivewords');
                  var Filter = Meteor.npmRequire('bad-words');
                  var customFilter = new Filter({ placeHolder: 'beep'});

                  var s = nlp.pos(text).sentences[0];
                  tags = s.tags();
                  console.log(tags);
                } catch (e) {
                    console.log("NLP error");
                }

                var matches = words(text);
                var offensive = false;
                _.each(matches, function(match){
                    text = text.replace(match, 'beep');
                    offensive = true;
                });

                if (offensive){
                    text += ". I saved your butt " + slack.slack_name + " watch it next time!";
                }


                message = 'Sent sound #' + PastSounds.find({}).count() + ' character(s) of text ' + text.length + " Tags: " + tags;
            // }

            Meteor.call('pushSound', slack.slack_name, customFilter.clean(text), lang, true, pitch, rate);

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

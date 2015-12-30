if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function() {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function() {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
        var Botkit = Meteor.npmRequire('botkit');

        var controller = Botkit.slackbot({
            debug: true
        });

        // connect the bot to a stream of messages
        controller.spawn({
            token: Meteor.settings.slack_api_token,
        }).startRTM();

        // give the bot something to listen for.
        controller.hears('hello', 'direct_message,direct_mention,mention,ambient', function(bot, message) {
            // console.log("HERE");
            bot.reply(message, 'Hello yourself.');
        });

        controller.hears('hey', 'direct_message,direct_mention,mention,ambient', function(bot, message) {
            // console.log("HERE");
            bot.reply(message, 'hey yourself.');
        });

        controller.hears('steve meme', 'direct_message,direct_mention,mention,ambient', function(bot, message) {
            var baseURL = 'http://dracobot.meteor.com/images/steve/';
            var images = ['watching.jpg', 'pony.jpg', 'hug.jpg', 'dance.jpg', 'steve.jpg', 'polka.jpg', 'toast.jpg'];
            var offset = Math.floor((Math.random() * images.length - 1) + 1);
            var image = baseURL + images[offset];

            bot.reply(message, 'Here is a awesome meme of Steve "The Rock" ' + image);
        });


        controller.hears(['identify yourself', 'who are you', 'what is your name'], 'direct_message,direct_mention,mention', function(bot, message) {
            bot.reply(message, ':robot_face: I am a bot named <@' + bot.identity.name + '>.');
        });

        controller.hears('more you know', 'direct_message,direct_mention,mention, ambient', function(bot, message) {
            bot.reply(message, 'http://i.giphy.com/R6bDgXEXCLcIw.gif');
        });

        controller.on('message', function(bot, message) {
            console.log("HERE");
            // console.log(message);
            var jon = 'U030Z0K5R';
            var steve = 'U0310UBCE';

            if (message.user === jon) {
                // bot.reply(message, 'Everyone Jon is typing!');
            }

            if (message.user === steve) {
                // bot.reply(message, 'No Steve');
            }
        });

        controller.hears('homer', 'direct_message, direct_mention, mention, ambient', function(bot, message) {
            var image = 'http://dracobot.meteor.com/images/homer.gif';
            // console.log("Here");
            bot.reply(message, image);
        });

        controller.hears(['question me'], ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {

            // start a conversation to handle this response.
            bot.startConversation(message, function(err, convo) {

                convo.ask('Shall we proceed Say YES, NO or DONE to quit.', [
                {
                    pattern: 'done',
                    callback: function(response, convo) {
                        convo.say('OK you are done!');
                        convo.next();
                    }
                },
                {
                    pattern: bot.utterances.yes,
                    callback: function(response, convo) {
                        convo.say('Great! I will continue...');
                        // do something else...
                        convo.next();

                    }
                },
                {
                    pattern: bot.utterances.no,
                    callback: function(response, convo) {
                        convo.say('Perhaps later.');
                        // do something else...
                        convo.next();
                    }
                },
                {
                    default: true,
                    callback: function(response, convo) {
                        // just repeat the question
                        convo.repeat();
                        convo.next();
                    }
                }]);

            });

        });

    });
}

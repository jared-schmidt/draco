People = new Meteor.Collection("people");
Game = new Meteor.Collection("game");
DesktopNotifications = new Meteor.Collection("desktopNotifications");


if (Meteor.isServer) {
// Reads in the JSON file of all the commands
    var mycommands = JSON.parse(Assets.getText("commands.json"));
}

Router.route('api_draco', {
    where: 'server',
    path: '/api/v1/draco'
  })
  .get(function () {
    console.log("GET Test");
    this.response.end('Hello, get request\n');
  })
  .post(function () {
    var json_data = this.request.body;

    var slack_id = json_data['user_id'];
    var slack_token = json_data['token'];
    var slack_name = json_data['user_name']

    var trigger = json_data['command'];
    var channel_id = json_data['channel_id'];

    var text = json_data['text'];
    var command = '';

    // Checks if text was passed to the bot
    if (text.length > 0){
        // spilts the string at all spaces
        // and gets the first word in the text the user passed in
        // this is the command
        var command = String(text.split(' ')[0]);

        // Cleans up the command
        command = command.replace(',', '');
        command = command.trim();
        command = command.toLowerCase();
    }

    // Prints the command that was called to the log
    console.log("command -> ", command);

    var message = 'Try using a command like "'+trigger+' help"';
    if (command){

        // Upadtes the person with the last command they called
        People.update({'id': slack_id}, {$set:{'lastCommand':command}});

        // Updates the person with the number of times they called the bot
        People.update({'id': slack_id}, {$inc:{'dracoCountCall':1}});

        // Checks if the command is in the JSON file
        if (mycommands['commands'][command]){

            var mycommand = mycommands['commands'][command];

            // Checks if the command is active
            if (mycommand['active']){
                // Remove the command from the text that was passed to the bot
                text = text.replace(command, '');
                text = text.trim();

                var slack_obj = {
                    'slack_id':slack_id,
                    'slack_token':slack_token,
                    'slack_name':slack_name,
                    'trigger':trigger,
                    'channel_id':channel_id,
                    'text':text,
                    'command':command
                }

                // This creates a function as a string
                var exp = 'return ' + command + '.start(slack_obj);';

                // Takes the function-string created above and makes it a function,
                // that takes 1 argument
                var call_thing = new Function(['slack_obj'],exp);

                // This then calls the functions passing in the slack object
                message = call_thing(slack_obj);
            }else{
                message = "Command is not currently active.";
            }
        }else{
            message = 'Not sure what ' + command + ' is.';
        }
    }

    // This is the respsonse (JSON) that is returned to slack after the POST call was made
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(message);

  });

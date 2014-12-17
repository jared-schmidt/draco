People = new Meteor.Collection("people");

var mycommands = JSON.parse(Assets.getText("commands.json"));

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

    console.log('channel-> ', json_data['channel_name']);
    console.log('channel id -> ', json_data['channel_id']);

    var text = json_data['text'];
    var command = '';
    if (text.length > 0){
        var command = String(text.split(' ')[0]);
        command = command.replace(',', '');
        command = command.trim();
        command = command.toLowerCase();
    }

    console.log("command -> ", command);

    var message = 'Try using a command like "'+trigger+' commands"';
    if (command){
        if (mycommands['commands'][command]){
            console.log("Commands");
            var mycommand = mycommands['commands'][command];
            if (mycommand['active']){
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
                var exp = 'return ' + command + '.start(slack_obj);';
                var call_thing = new Function(['slack_obj'],exp);
                message = call_thing(slack_obj);
            }else{
                message = "Command is not currently active.";
            }
        }else{
            message = 'Not sure what ' + command + ' is.';
        }


    //     switch(command){
    //         case 'help':
    //         case 'commands':
    //             message = '\n';
    //             // message = 'whoami - checks if you are connected to the site. \n';
    //             // message += 'connect {email} - Connects slack to the site. \n';
    //             // message += 'move {place} - Moves location. \n';
    //             // message += 'whereami - Gives current location. \n';
    //             message += 'gif {text} - Returns gif based on text. \n';
    //             message += 'sticker {text} - Returns sticker based on text. \n';
    //             message += 'star {username} - Gives a goldstar to a person. \n';
    //             message += 'mystars - Gives you number of stars you have. \n';
    //             message += 'table - Gif of flipping a table. \n';
    //             message += 'about - about. \n';
    //             break;





    //         case 'refresh':
    //             var people = get_slack_users();
    //             for(var i=0;i<people.length;i++){
    //                 var person = People.findOne({'name': people[i].name});
    //                 if (!person){
    //                     People.insert(people[i]);
    //                     People.update({'name': people[i].name}, {$set:{'goldstar': 0}});
    //                 }
    //             }
    //             message = 'Updated people';
    //             break;

    //         default:
    //             message = 'Not sure what '+command+' is.';
    //     }
    }

    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(message);

  });

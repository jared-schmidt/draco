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

    var message = 'Try using a command like "'+trigger+' help"';
    if (command){
        People.update({'id': slack_id}, {$set:{'lastCommand':command}});
        People.update({'id': slack_id}, {$inc:{'dracoCountCall':1}});
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
    }

    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(message);

  });

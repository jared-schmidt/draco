People = new Meteor.Collection("people");

var mycommands = JSON.parse(Assets.getText("commands.json"));



//Converts text to use in query string
function q_string(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Router.route('api_rpg', {
    where: 'server',
    path: '/api/v1/rpg'
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
                // message = eval('(' + command+".start" + ')').call(slack_obj);
                var exp = 'return ' + command + '.start(slack_obj);';
                var call_thing = new Function(['slack_obj'],exp);
                message = call_thing(slack_obj);
            }else{
                message = "Command is not currently active.";
            }
        }else{
            message = 'Not sure what ' + command + ' is.';
        }


        // text = text.replace(command, '');
        // text = text.trim();
        // console.log("text -> ", text)
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
    //         case 'connect':
    //             if (validateEmail(text)){
    //                 var user = Apiusers.findOne({'email': text});
    //                 if (!user){
    //                     Meteor.call('createUser', slack_id, slack_token, slack_name, text);
    //                     message = 'Go check your email, and keep your fingers crossed that it is there.';
    //                 }else{
    //                     message = "You already signed up. If you didn't get the email, as of now, that sucks!";
    //                 }
    //             }
    //             else{
    //                 message = "Needs to be a valid email address.";
    //             }
    //             break;
    //         case 'whoami':
    //             user = null;
    //             var user = Apiusers.findOne({'slack_user_id':slack_id});
    //             if (user){
    //                 message = "You are " + user.slack_name + '. connected to email ' + user.email;
    //             }
    //             else{
    //                 message = "Use the connect function";
    //             }
    //             break;
    //         case 'move':
    //             switch(text){
    //                 case '':
    //                     message = 'town \n';
    //                     message += 'store \n';
    //                     break;
    //                 case 'town':
    //                     message = "Moving you to town.";
    //                     Apiusers.update({'slack_user_id':slack_id}, {$set:{'location':'town'}});

    //                     break;
    //                 case 'store':
    //                     message = "Moving you to store";
    //                     Apiusers.update({'slack_user_id':slack_id}, {$set:{'location':'store'}});
    //                     break;
    //                 default:
    //                     message = "Hell if I know where that is.";
    //             }
    //             break;
    //         case 'whereami':
    //             var user = null;
    //             user = Apiusers.findOne({'slack_user_id':slack_id});
    //             if (user){
    //                 message = "You are at " + user.location;
    //             }
    //             else{
    //                 message = "Use the connect function";
    //             }
    //             break;
    //         case 'about':
    //             message = 'Something?';
    //             break;
    //         case 'steve':
    //             var url = 'https://slack.com/api/chat.postMessage';
    //             var slack_api_token = 'xoxp-3027284929-3033279105-3192423814-fdc13f';

    //             var payload = {
    //                 "token":slack_api_token,
    //                 "channel":channel_id,
    //                 "text": text,
    //                 "username": "strevorrow",
    //                 "icon_url": "https://secure.gravatar.com/avatar/f5f216ca3c01cf052cfbb854846c3eb3.jpg?s=72&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0008-72.png"
    //             }
    //             var result = HTTP.call("GET", url, {params: payload});
    //             message = 'sent';
    //             break;

    //         case 'person':
    //             var people = get_slack_users();

    //             var person_name = get_person_name(text);

    //             var person = '';

    //             for(var i=0;i<people.length;i++){
    //                 if(people[i].name == person_name){
    //                     person = people[i];
    //                 }
    //             }

    //             if(person != ''){
    //                 name = person_name;
    //                 icon = person['profile']['image_32'];
    //                 text = text.replace(person_name, '');
    //                 text = text.trim();
    //                 person_bot(text, channel_id, name, icon)
    //                 message = "Sent message as " + person_name;
    //             }else{
    //                 message = "Found no one";
    //             }

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

    // var out_obj = {
    //     'text' : message
    // }

    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(message);

  });



function get_person_name(text){
    var person_name = String(text.split(' ')[0]);
    person_name = person_name.replace(',', '');
    person_name = person_name.replace('@', '');
    return person_name.trim();
}

function get_slack_users(){
    var url = 'https://slack.com/api/users.list?token=xoxp-3027284929-3033279105-3192423814-fdc13f&pretty=1'
    var req = Meteor.http.get(url);
    var j_data =req.data;
    return j_data['members'];
}






// function executeFunctionByName(functionName, context /*, args */) {
//     console.log('Function Name:-> ' + functionName);
//   var args = [].slice.call(arguments).splice(2);
//   var namespaces = functionName.split(".");
//   var func = namespaces.pop();
//   for(var i = 0; i < namespaces.length; i++) {
//     context = context[namespaces[i]];
//   }
//   return context[func].apply(this, args);
// }
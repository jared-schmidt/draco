// Apiusers = new Meteor.Collection("apiusers");




Meteor.methods({
        createUser : function(slack_id, slack_token, slack_name, email){
            var userId = Apiusers.insert({
                'slack_user_id' : slack_id,
                'slack_token' : slack_token,
                'slack_name': slack_name,
                'email': email,
                'createdOn' : new Date(),
                'confirmed': false,
                'gold': 500,
                'inventory' : [],
                'wearing' : [],
                'health': [],
                'location': 'town'
            });
            send_email(email, userId, slack_id)
            return userId;
        },
        confirmuser:function(_id){
            Apiusers.update({'_id':_id}, {$set:{'confirmed':true}});
        }
});


function send_email(to_address, userId, slack_id){
    code = userId;
    subject = "Hello";

    // var encrypted = CryptoJS.DES.encrypt(code, "Secret Passphrase");

    message = 'http://rpgbot.meteor.com/account/' + userId;

    Email.send({
        from: "rpg@gmail.com",
        to: 'jschmidt@problemsolutions.net',
        subject: subject,
        text: message
    });
}
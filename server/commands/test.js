test = {
    start:function(slack){
        message = 'Hello world!';

        Meteor.call('pushSound');

        return message;
    }
}

test = {
    start:function(slack){
        message = 'Hello world!';

        var nlp = Meteor.npmRequire('nlp_compromise');
        console.log(nlp.spot(slack['text']));
        message = nlp.pos(slack['text']).negate().text();

        return message;
    }
}

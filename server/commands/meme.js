meme = {
    start:function(slack){
        var text = slack['text'].split('|')

        var Cherrio = Meteor.npmRequire('cheerio');

        var req = Meteor.http.get('http://apimeme.com');
        $ = Cherrio.load(req.content);
        var mem_lst = []
        $("#meme option").each(function(){
          var val = $(this).text();
          val = val.replace(' ', '+')
          // console.log(val);
          mem_lst.push(val);
        });
        var offset = Math.floor((Math.random() * mem_lst.length-1) + 0); //random number between 1 and 10

        var meme = mem_lst[offset].split(' ').join('+');

        var url = 'http://apimeme.com/meme?'+q_string({'top':text[0]})+'&'+q_string({'bottom':text[1]}) +'&meme='+meme;
        try{
            outgoing_bot(slack['slack_id'], 'called by: '+ slack['slack_name'] +" " + url, slack['channel_id']);
            message = "Sent";
        } catch(err){
            message = 'failed to find image.';
        }
        return message;
    }
}

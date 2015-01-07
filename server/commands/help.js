help = {
    start:function(slack){
        message = '\n';

        // message += 'about - about. \n';

        var mycommands = JSON.parse(Assets.getText("commands.json"));
        keys = Object.keys(mycommands['commands']);
        keys.sort();
        var len = keys.length;

        for(var i=0; i<len; i++){
            k = keys[i];
            var obj = mycommands['commands'][k];
            if (obj['active'] && !obj['hidden']){
                var extra = '';
                if(obj.hasOwnProperty('extra')){
                    extra = '{'+ obj['extra'] + '}';
                }
                message += key + ' ' + extra +' - ' + obj['what'] + '\n';
            }
        }

        return message;
    }
}

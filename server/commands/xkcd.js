xkcd = {
    start:function(slack){
        var url = 'http://xkcd.com/info.0.json';
        var j_data = get_call(url);
        try{
            message = "<"+j_data.img+"|"+j_data.title+">";
        }catch(err){
            message = 'failed to find comic.';
        }
        return message;
    }
};

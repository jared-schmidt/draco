help = {
    start:function(slack){
        message = '\n';
        message += 'gif {text} - Returns gif based on text. \n';
        message += 'sticker {text} - Returns sticker based on text. \n';
        message += 'star {username} - Gives a goldstar to a person. \n';
        message += 'mystars - Gives you number of stars you have. \n';
        message += 'table - Gif of flipping a table. \n';
        message += 'meme {toptext|bottomText} - Meme with text. \n';
        message += 'face {text} - Returns a face?'
        message += 'about - about. \n';
        return message;
    }
}

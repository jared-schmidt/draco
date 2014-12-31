help = {
    start:function(slack){
        message = '\n';
        message += 'gif {text} - Returns gif based on text. \n';
        message += 'sticker {text} - Returns sticker based on text. \n';
        message += 'star {username} - Gives a goldstar to a person. \n';
        message += 'mystars - Gives you number of stars you have. \n';
        message += 'table - Gif of flipping a table. \n';
        message += 'meme {toptext|bottomText} - Meme with text. \n';
        message += 'face {text} - Returns a face? \n';
        message += 'robot {text} - Returns a robot generatered from your text. \n';
        message += 'cookie - Returns a fortune cookie message. \n';
        message += 'game question - Returns a question for anyone to answer. \n';
        message += 'game answer {text} - Submits an answer for the question. \n';
        message += 'steve {text*} - Returns a random meme picture of Steve. \n';
        message += 'yoda {text} - Returns talk like yoda. \n';
        message += 'about - about. \n';
        return message;
    }
}

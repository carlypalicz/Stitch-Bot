const Discord = require('discord.js');

const time = 60000 //1 minute

const word = "coveysux";
wordLength = word.length;
guesses = [];
lettersGuessed = [];

for (i = 0; i < wordLength; i++){
    guesses[i] = '❔';
}

const alphabet={
    'stitch_a': ['<:stitch_a:823344398409662484>'],
    'stitch_b': ['<:stitch_b:823348619926569010>'],
    'stitch_c': ['<:stitch_c:823348666374029332>'],
    'stitch_d': ['<:stitch_d:823348742735921182>'],
    'stitch_e': ['<:stitch_e:823348742970277909>'],
    'stitch_f': ['<:stitch_f:823348743146307653>'],
    'stitch_g': ['<:stitch_g:823348743260340224>'],
    'stitch_h': ['<:stitch_h:823348743474118656>'],
    'stitch_i': ['<:stitch_i:823350913108410408>'],
    'stitch_j': ['<:stitch_j:823351325919281202>'],
    'stitch_k': ['<:stitch_k:823351386288553994>'],
    'stitch_l': ['<:stitch_l:823351541238071336>'],
    'stitch_m': ['<:stitch_m:823351598574862358>'],
    'stitch_n': ['<:stitch_n:823351741093118034>'],
    'stitch_o': ['<:stitch_o:823351822788853829>'],
    'stitch_p': ['<:stitch_p:823351898198769704>'],
    'stitch_q': ['<:stitch_q:823352133104959538>'],
    'stitch_r': ['<:stitch_r:823352331818500096>'],
    'stitch_s': ['<:stitch_s:823352508985901059>'],
    'stitch_t': ['<:stitch_t:823352588468224010>'],
    'stitch_u': ['<:stitch_u:823352744840265808>'],
    'stitch_v': ['<:stitch_v:823352910711750716>'],
    'stitch_w': ['<:stitch_w:823352996829593650>'],
    'stitch_x': ['<:stitch_x:823354927241625651>'],
    'stitch_y': ['<:stitch_y:823355006518165514>'],
    'stitch_z1': ['<:stitch_z1:823360282741964830>'],
    'stitch_z2': ['<:stitch_z2:823361048798953493>']
};

module.exports = {
    name: 'react',
    description: 'add a reaction to a message',
    execute(message){
        strikes = 5;
        descrip = getDescription();
        console.log(descrip);
        const embed = new Discord.MessageEmbed()
            .setColor('A91B0D')
            .setTitle('Let\'s Play Hangman')
            .setDescription(descrip)
            .addField('Wrong Guesses Left: ', strikes)
            .addField('Letter\'s Guessed: ', '\u200b' + lettersGuessed.join(', '))
            .setTimestamp();
        message.channel.send(embed)

        .then(function (msg) {
            const collector = msg.createReactionCollector(filter, {max: 9});

            collector.on('collect', (reaction, user) => {
                emojiname = reaction.emoji.name;
                console.log(`Collected ${reaction.emoji.name}`);
                descrip += alphabet[emojiname];
                console.log(emojiname.charAt(emojiname.length-1));
                msg.edit(makeGuess(descrip, emojiname.charAt(emojiname.length-1), emojiname, msg));
            });

            collector.on('end', collected => {
                msg.edit(lose());
                console.log(`Collected ${collected.size} items`);
            });

            message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 600000}).then(collected => {
                if (collected.first().content.toLowerCase() == 'coveysux'){
                    message.reply('YEET');
                }
                else {
                    message.reply('NOPE');
                }
            }).catch(() => {
                message.reply('timed out');
            })

        });
    }
}

function filter(reaction, user){
    return (!user.bot);
}

function makeGuess(description, letter, emote_name){
    lettersGuessed.push(alphabet[emote_name]);
    console.log('word to guess is: ' + word);
    console.log('letter guessed is:' +letter)
    console.log('index of letter in word is: ' + word.indexOf(letter));
    if (word.indexOf(letter) === -1){
        console.log("a wrong guess was made!");
        if (strikes > 0) {
            strikes--;
        } else {
            return lose();
        }

    }
    else {
        console.log("a correct guess was made!");
        for (i = 0; i < word.length; i++){
            if (word.charAt(i) === letter){
                guesses[i] = letter; 
            }
        }
        console.log(guesses)
    }
    if (guesses.indexOf('❔') === -1){
        return win();
    }
    embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('Let\'s Play Hangman')
    .setDescription(getDescription())
    .addField('Wrong Guesses Left: ', strikes)
    .addField('Letter\'s Guessed: ', '\u200b' + lettersGuessed.join(', '))
    .setTimestamp();
    return embed;
}

function getDescription() {
    description = 'Guess the following word/phrase by reacting to this message with a Stitch Letter!\n';
    for (i = 0; i < wordLength; i++){
        description += guesses[i];
    }
    description += '\n Letters guessed so far: \n'
    return description;
}

function win(){
    description = "CONGRATS! You correctly guessed the word/phrase, and 11 ylapples have been earned. Feel free to play again in an hour!\n"

    embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You WON!!! | Let\'s Play Hangman')
    .setDescription(description)
    .addField('Great job! The correct answer was: ', word)
    .setTimestamp();

    resetGame();
    return embed;
}

function lose(){
    description = "You did not correctly guess the word/phrase, so no ylapples have been earned. Please try again in an hour!\n"

    embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You LOST | Let\'s Play Hangman')
    .setDescription(description)
    .addField('The correct answer was: ', word)
    .setTimestamp();

    resetGame();
    return embed;
}

function resetGame(){
    guesses = [];
    lettersGuessed = [];
    for (i = 0; i < wordLength; i++){
        guesses[i] = '❔';
    }
}
const Discord = require('discord.js');

const time = 60000 //1 minute

let guesses;
let lettersGuessed;

let word, wordLength, strikes;

const wordBank = ['coveysux', 'ok boomer', 'bobby my beloved', 'ylapples', 'join the discord', 'fuck that guy i hope hes dead', 'cardinal sin', 'class of cardinal sin', 'some cats live some cats die', 'haggarty', 'benjamin bork', 'gabe godman', 'harris haggarty', 'henry haggarty', 'tevin thompson', 'sammy jammy', 'ray razzi', 'fence ferguson', 'jack and jake johnson', 'alex anderson', 'lewis lin', 'tony tazzari', 'wade wallace', 'danny davis', 'jamie jones', 'freddy freeman', 'gretta greene', 'leila lee', 'martha may', 'brandon brown', 'penny perkins', 'caleb cameron', 'suzie simons', 'bobby freeman', 'mr gabberman', 'mr tatterson', 'mr jones', 'mrs baxterban', 'mrs zniderick', 'mrs hackerly', 'the surgeon', 'morbious morrison', 'prince najefe', 'preston grittletwain', 'malady sundew', 'jim scalopini', 'winston walrus', 'mortal realm', 'death realm', 'middle ground', 'spirit realm', 'rebirth realm', 'fox tears', 'haggarty corner store', 'hugo haggarty', 'black orb middle ground', 'winfred stitch', 'the fox killed bobby', 'bellport house', 'gatekeeper', 'you must contain prince najefe', 'in the dark you will find light', 'jim is the air to the throne', 'bobby is not who you think he is', 'bobby i miss you', 'call home', 'same white shoes', 'old man', 'stockholm syndrome', 'funeral home', 'eyesore', 'you dont need me', 'in or out', 'cut on the crease', 'why am i alive', 'four dollar sandwich', 'point mutation', 'local anesthesia', 'sound of a gun', 'marzipan pills', 'jupiter', 'gecko', 'cloudy eyes', 'fractured brain', 'you can eat me', 'basement', 'stable now', 'plane crash', 'bile of the beast', 'invader zim', 'skittish cat', 'young and nauseous', 'blood mump', 'crot defensive form', 'soul worm vision', 'choggo farming', 'the cultists', 'tour to nobody', 'leeches screaming at the walls', 'rip jeremy', 'its that fox again', 'gengcharsquirtasaur', 'are you still eating sour lemons', 'theres a left shoe', 'overtired and dead inside', 'blind luck burns slow', 'i just wanna be consumed', 'piping hot procrastination', 'its thoughts like this', 'looming with intent', 'its like kleptomania', 'i dont think im scary', 'fucked up family dinner', 'a genetic anomaly', 'i am undercooked', 'stay together for the kids', 'strong spine sammy jame', 's shaped vertebrae', 'sleeping through that summer sun', 'a bowl of your mothers homemade soup', 'open wound that begs for salt', 'yellow socks', 'call me a loser', 'late night wasters', 'hot sauce moment', 'red blue dichotomy', 'curse the fox', 'the elders'];

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
        let rand = Math.floor(Math.random()*(wordBank.length)); //index for a random word
        word = wordBank[rand];
        wordLength = word.length;
        guesses = [];
        lettersGuessed = [];
        
        for (let i = 0; i < wordLength; i++){
            guesses[i] = (word.charAt(i) == ' ') ? '|' : '❔';
        }

        strikes = 5;
        let descrip = getDescription();
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
            const collector = msg.createReactionCollector(filter, {max: 16});

            collector.on('collect', (reaction, user) => {
                let emojiname = reaction.emoji.name;
                console.log(`Collected ${reaction.emoji.name}`);
                descrip += alphabet[emojiname];
                console.log(emojiname.charAt(emojiname.length-1));
                msg.edit(makeGuess(descrip, emojiname.charAt(emojiname.length-1), emojiname));
            });

            collector.on('end', collected => {
                msg.edit(loseByOutOfTurns());
                console.log(`Collected ${collected.size} items`);
            });

            message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 300000}).then(collected => {
                if (collected.first().content.toLowerCase() == word){
                    msg.edit(winByWordGuessedRight());
                }
                else {
                    msg.edit(loseByWordGuessedWrong());
                }
            }).catch(() => {
                msg.edit(timedOut());
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
            return loseByOutOfTurns();
        }

    }
    else {
        console.log("a correct guess was made!");
        for (let i = 0; i < word.length; i++){
            if (word.charAt(i) === letter){
                guesses[i] = letter; 
            }
        }
        console.log(guesses)
    }
    if (guesses.indexOf('❔') === -1){
        return winByLettersRevealed();
    }
    return new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('Let\'s Play Hangman')
    .setDescription(getDescription())
    .addField('Wrong Guesses Left: ', strikes)
    .addField('Letter\'s Guessed: ', '\u200b' + lettersGuessed.join(', '))
    .setTimestamp();
}

function getDescription() {
    let description = 'Guess the following word/phrase by reacting to this message with a Stitch Letter!\n';
    for (let i = 0; i < wordLength; i++){
        description += guesses[i];
    }
    description += '\n Letters guessed so far: \n'
    return description;
}

function winByLettersRevealed(){
    let description = "CONGRATS! The word/phrase has been fully revealed, and you have won 11 ylapples. Feel free to play again in an hour!\n"

    let embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You WON!!! | Let\'s Play Hangman')
    .setDescription(description)
    .addField('Great job! The correct answer was: ', word)
    .setTimestamp();

    resetGame();
    return embed;
}

function loseByOutOfTurns(){
    let description = "You did not correctly guess the word/phrase, so no ylapples have been earned. Please try again in an hour!\n"

    let embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You LOST | Let\'s Play Hangman')
    .setDescription(description)
    .addField('The correct answer was: ', word)
    .setTimestamp();

    resetGame();
    return embed;
}

function winByWordGuessedRight(){
    let description = "CONGRATS! You correctly guessed the word/phrase, and 11 ylapples have been earned. Feel free to play again in an hour!\n"

    let embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You WON!!! | Let\'s Play Hangman')
    .setDescription(description)
    .addField('Great job! The correct answer was: ', word)
    .setTimestamp();

    resetGame();
    return embed;
}

function loseByWordGuessedWrong(){
    let description = "You made an incorrect guess, so no ylapples have been earned. Please try again in an hour!\n"

    let embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You LOST | Let\'s Play Hangman')
    .setDescription(description)
    .addField('The correct answer was: ', word)
    .setTimestamp();

    resetGame();
    return embed;
}

function timedOut(){
    let description = "No guess made in 5 minutes, game has timed out.\n"

    let embed = new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('Timed Out | Let\'s Play Hangman')
    .setDescription(description)
    .setTimestamp();

    resetGame();
    return embed;    
}

function resetGame(){
    console.log('game reset');
}
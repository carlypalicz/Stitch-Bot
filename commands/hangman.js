const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');

const time = 60000 //1 minute

let guesses;
let lettersGuessed;
let current_time;
let word, wordLength, strikes, numLetters, numCorrectGuesses;

let gameOver;

const wordBank = ['coveysux', 'ok boomer', 'bobby my beloved', 'ylapples', 'join the discord', 'fuck that guy i hope hes dead', 'cardinal sin', 'class of cardinal sin', 'some cats live some cats die', 'haggarty', 'benjamin bork', 'gabe godman', 'harris haggarty', 'henry haggarty', 'tevin thompson', 'sammy jammy', 'ray razzi', 'fence ferguson', 'jack and jake johnson', 'alex anderson', 'lewis lin', 'tony tazzari', 'wade wallace', 'danny davis', 'jamie jones', 'freddy freeman', 'gretta greene', 'leila lee', 'martha may', 'brandon brown', 'penny perkins', 'caleb cameron', 'suzie simons', 'bobby freeman', 'mr gabberman', 'mr tatterson', 'mr jones', 'mrs baxterban', 'mrs zniderick', 'mrs hackerly', 'the surgeon', 'morbious morrison', 'prince najefe', 'preston grittletwain', 'malady sundew', 'jim scalopini', 'winston walrus', 'mortal realm', 'death realm', 'middle ground', 'spirit realm', 'rebirth realm', 'fox tears', 'haggarty corner store', 'hugo haggarty', 'black orb middle ground', 'winfred stitch', 'the fox killed bobby', 'bellport house', 'gatekeeper', 'you must contain prince najefe', 'in the dark you will find light', 'jim is the air to the throne', 'bobby is not who you think he is', 'bobby i miss you', 'call home', 'same white shoes', 'old man', 'stockholm syndrome', 'funeral home', 'eyesore', 'you dont need me', 'in or out', 'cut on the crease', 'why am i alive', 'four dollar sandwich', 'point mutation', 'crooked spine', 'local anesthesia', 'sound of a gun', 'marzipan pills', 'jupiter', 'gecko', 'cloudy eyes', 'fractured brain', 'you can eat me', 'basement', 'stable now', 'plane crash', 'bile of the beast', 'invader zim', 'skittish cat', 'young and nauseous', 'blood mump', 'crot defensive form', 'soul worm vision', 'choggo farming', 'the cultists', 'tour to nobody', 'leeches screaming at the walls', 'rip jeremy', 'its that fox again', 'gengcharsquirtasaur', 'are you still eating sour lemons', 'theres a left shoe', 'overtired and dead inside', 'blind luck burns slow', 'i just wanna be consumed', 'piping hot procrastination', 'its thoughts like this', 'looming with intent', 'its like kleptomania', 'i dont think im scary', 'fucked up family dinner', 'a genetic anomaly', 'i am undercooked', 'stay together for the kids', 'strong spine sammy jane', 's shaped vertebrae', 'sleeping through that summer sun', 'a bowl of your mothers homemade soup', 'open wound that begs for salt', 'yellow socks', 'call me a loser', 'late night wasters', 'hot sauce moment', 'red blue dichotomy', 'curse the fox', 'the elders', 'consensual human leather', 'wittle kitten', 'albatross soup riddle', 'domino death curse', 'calebs house party', 'baxterbans feasts', 'ccs rule book', 'bobbys instagram', 'rays laboratory', 'freddy killed the fox', 'ben tried the bad drug', 'ben cut his arm off', 'jamie takes the train', 'penny robs the store', 'harris gets shot', 'tevin runs a red light', 'wade gets distracted', 'brandon cant swim', 'tevin cant drive', 'president sammy jammy'];

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

const bonusMatrix = [1, 1, 3, 5, 10, 15]; //how many bonus ylapples you get for guessing with index+1 letters left to reveal

module.exports = {
    name: 'hangman',
    description: 'play a game of hangman',
    async execute(message, profileData){
        current_time = Date.now();
        //const cooldown_amount =  1000 * 60 * 1; 
        //const expiration_time = profileData.lastHangman+cooldown_amount;

        // if (current_time < profileData.lastHangman+cooldown_amount){
        //     const time_left = (expiration_time - current_time);
        //     return message.channel.send(`Please wait ${convert_ms(time_left)} before you can play again.`);
        // }

        await profileModel.findOneAndUpdate({
            userID: profileData.userID,
        }, {
            lastHangman: current_time,
        });

        let rand = Math.floor(Math.random()*(wordBank.length)); //index for a random word
        word = wordBank[rand];
        wordLength = word.length;
        guesses = [];
        lettersGuessed = [];
        gameOver = false;
        numLetters = numUniqueChars(word);
        numCorrectGuesses = 0;

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
            .addField('Wrong Guesses Left: ', strikes.toString())
            .addField('Letters Guessed: ', '\u200b' + lettersGuessed.join(', '))
            .addField('Stop the Surgeon from cursing the fox!', surgeon()+'\n<:blank:881814718917001237><:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750>\n')
            .setTimestamp();
        message.channel.send({embeds: [embed]})

        .then(function (msg) {
            const collector = msg.createReactionCollector(filter);

            collector.on('collect', (reaction, user) => {
                let emojiname = reaction.emoji.name;
                
                if (gameOver){
                    return;
                }

                else if (emojiname.substring(0, 6) == "stitch" && user.id == message.author.id) {
                    console.log(`Collected ${reaction.emoji.name}`);
                    descrip += alphabet[emojiname];
                    msg.edit(makeGuess(emojiname.charAt(emojiname.length-1), emojiname, profileData, message));
                }
                reaction.remove()
                .catch(err => console.log('failed to remove reaction'));
            });

            collector.on('end', collected => {
                msg.edit(loseByOutOfTurns());
                console.log(`Collected ${collected.size} items`);
            });

            message.channel.awaitMessages(m => m.author.id == message.author.id, {time: 1000 * 60 * 7}).then(collected => {                
                if (gameOver || collected.first().c){
                    return;
                }

                let guess = collected.first().content.replace(/[^a-z+\s]+/gi, '');
                console.log(guess)
                if (guess.toLowerCase() == word){
                    let remainder = numLetters - numCorrectGuesses;
                    let bonusPoints = remainder >= 6 ? bonusMatrix[5] : bonusMatrix[remainder-1];
                    let award = 11 + bonusPoints;
                    msg.edit(winByWordGuessedRight(profileData, award));
                    message.reply(`great guess! You won ${award} ylapples <:ylapples:826531088188440588> and saved the fox!`)
                }
                else {
                    message.reply('unfortunately, you guessed incorrectly. The Surgeon thanks you for helping him escape.');
                    msg.edit(loseByWordGuessedWrong());
                }
            }).catch((err) => {
                console.log(err);
                msg.edit(timedOut());
            })

        });
    }
}

function filter(reaction, user){
    return (!user.bot);
}

function isGuess(msg){
    if (msg.substring(0, 5).toLowerCase() === 'guess'){
        let guess = msg.replace(/[^a-z+\s]+/gi, '').toLowerCase();
        return (guess === word) 
    }
    else {
        return false;
    }
}

function makeGuess(letter, emote_name, profileData, message){
    if (!lettersGuessed.includes(alphabet[emote_name])) {
        lettersGuessed.push(alphabet[emote_name]);
        console.log('word to guess is: ' + word);
        console.log('letter guessed is:' +letter)
        if (word.indexOf(letter) === -1){
            console.log("a wrong guess was made!");
            if (strikes > 1) {
                strikes--;
            } else {
                message.reply('uh oh...you made too many wrong guesses, and the surgeon cursed the fox. He thanks you for helping him escape.');
                return loseByOutOfTurns();
            }
        }
        else {
            console.log("a correct guess was made!");
            numCorrectGuesses++;
            for (let i = 0; i < word.length; i++){
                if (word.charAt(i) === letter){
                    guesses[i] = letter; 
                }
            }
            console.log(guesses)
        }
        if (guesses.indexOf('❔') === -1){
            message.reply('great job! You revealed all the letters before the surgeon could curse the fox. 11 ylapples<:ylapples:826531088188440588> have been awarded to you as thanks.');
            return winByLettersRevealed(profileData);
        }
    }

    return new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('Let\'s Play Hangman')
    .setDescription(getDescription())
    .addField('Wrong Guesses Left: ', strikes.toString())
    .addField('Letters Guessed: ', '\u200b' + lettersGuessed.join(', '))
    .addField('\u200b', surgeon() +'\n' + orbs(5-strikes, true))
    .setTimestamp();
}

function getDescription() {
    let description = 'Stop the Surgeon from cursing the fox by guessing the following word/phrase. Make guesses by reacting to this message with Stitch letters! When you think you know the answer, submit your guess by sending it (in english) in a message in this channel.\n\n';
    for (let i = 0; i < wordLength; i++){
        description += guesses[i];
    }
    return description;
}

function winByLettersRevealed(profileData){
    gameOver = true;
    awardYlapples(profileData, 11);
    let description = "CONGRATS! The word/phrase has been fully revealed, and you have won 11 ylapples. Feel free to try again!\n"

    return new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You WON!!! | Let\'s Play Hangman')
    .setDescription(description)
    .addField('Great job! The correct answer was: ', word)
    .addField('You stopped the Surgeon!', asciifox())
    .setTimestamp();
}

function loseByOutOfTurns(){
    gameOver = true;
    let description = "You did not correctly guess the word/phrase, so no ylapples have been earned. Feel free to try again!\n"

    return new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You LOST | Let\'s Play Hangman')
    .setDescription(description)
    .addField('\nThe correct answer was: ', word)
    .addField('\u200b', orbs(5, false) + cursedFox())
    .setTimestamp();
}

function winByWordGuessedRight(profileData, award){
    gameOver = true;
    awardYlapples(profileData, award);

    let description = `CONGRATS! You correctly guessed the word/phrase, and ${award} ylapples have been earned. Feel free to play again!\n`

    return new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You WON!!! | Let\'s Play Hangman')
    .setDescription(description)
    .addField('Great job! The correct answer was: ', word)
    .addField('You stopped the Surgeon!', asciifox())
    .setTimestamp();
}

function loseByWordGuessedWrong(){
    gameOver = true;
    let description = "You made an incorrect guess, so no ylapples have been earned. Please try again!\n"

    return new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('You LOST | Let\'s Play Hangman')
    .setDescription(description)
    .addField('The correct answer was: ', word)
    .addField('\u200b', orbs(5, false) + cursedFox())
    .setTimestamp();
}

function timedOut(){
    gameOver = true;

    let description = "No guess made in 7 minutes, game has timed out.\n"

    return new Discord.MessageEmbed()
    .setColor('A91B0D')
    .setTitle('Timed Out | Let\'s Play Hangman')
    .setDescription(description)
    .addField('\u200b', orbs(5, false) + cursedFox())
    .setTimestamp();
}

async function awardYlapples(profileData, award){

    await profileModel.findOneAndUpdate({
        userID: profileData.userID,
    }, {
        $inc: {
            ylapples: award,
        }
    });
}

function convert_ms(duration){
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return minutes + " minutes";
}

function cursedFox(){
    let line1 = '<:blank:881814718917001237><:cursed_0_0:881761989775478795><:cursed_1_0:881761989834178600><:cursed_2_0:881761989846765568><:cursed_3_0:881761989330886658>\n';
    let line2 = '<:blank:881814718917001237><:cursed_0_1:881761990043906079><:cursed_1_1:881761990358491186><:cursed_2_1:881761989939068958><:cursed_3_1:881761515152224267>\n';
    let line3 = '<:blank:881814718917001237><:cursed_0_2:881761990186504242><:cursed_1_2:881761989725134899><:cursed_2_2:881761989846790184>\n';
    let line4 = '<:blank:881814718917001237><:cursed_0_3:881761989687406612><:cursed_1_3:881761989813239868>';
    return '\n' + line1+line2+line3+line4;
}


function surgeon(){
    return '<:plague_doctor_0_0:881752822171983872><:plague_doctor_1_0:881752821848997919>\n<:plague_doctor_0_1:881752822075506718><:plague_doctor_1_1:881752821828038708>';
}

function orbs(strikes, blank){
    let output = blank ? '<:blank:881814718917001237>' : '';
    let orbs = ['🔵','<:pink_orb:881740876257321000>','<:black_orb:881741304030175322>','🟡','🔴'];
    for (let i = 0; i < 5; i++){
        if (i < strikes){
            output += orbs[i];
        }
        else{
            output += '<:holder:881755396686110750>'
        }
    }
    return output;
}

function asciifox(){
    let line0 = '```';
    let line1 = '　　　　　　 ／￣￣￣￣￣￣￣￣￣'+'\n';
    let line2 = '　　　　　　 | thanks bestie <3 ' + '\n';
    let line3 = '　　　　　　 /へ.＿＿＿＿＿＿＿＿' +'\n';
    let line4 = '    |\\__/|' +'\n';
    let line5 = '   /     \\' +'\n';
    let line6 = '  /_.^ ^,_\\' + '\n';
    let line7 = '     \\o/' +'\n';
    let line8 = '```';

    return line0+line1+line2+line3+line4+line5+line6+line7+line8;
}

function numUniqueChars(word){
    let wordFormatted = word.replace(/[^a-z+]+/gi, '').toLowerCase();
    let unique = '';
    for (let i = 0; i < wordFormatted.length; i++){
        if (unique.indexOf(wordFormatted.charAt(i)) === -1){
            unique += wordFormatted.charAt(i);
        } 
    }
    return unique.length;
}
const Discord = require('discord.js');
const qmark = '❔';
const tooth_id = "929132635798794240";
const ccid = "427579289102188575";

let steps = [
{
    react: '🦊',
    text: 'This is your *Starter* 4 the scavenger hunt\nHe is captured in an old self you must now confront\nHis body parts you stuck together\nAnd need protection from cloudy eyes\' weather',
    hint: 'TOMMY used hint - it\'s super effective! What? TOMMY is evolving! TOMMY evolved into COVEYSUX',
},
{
    react: '🌙',
    text: 'We know you don\'t like math\nSo rather than stats or counts\nIn order to reveal your path\nConsider these *numbers* - they\'re not amounts\n\n2 / 8 / 2\n2 / 6 / 1\n1 / 9 / 1\n2 / 3 / 2\n3 / 1 / 2-3\n3 / 4 / 1-3\n3 / 9 / 1',
    hint: 'The first in a row has the work you need\nWhich piece within it then proceeds\nAs for the numbers in part three\nA compliment we give to thee:\n\nA man of many words are you\nWe hope it\'s alright we\'ve borrowed a few\n',
},
{
    react: '🍌',
    text: 'Now he\'ll TARTS the next clue as only he can\nHe pets a horse, he NAGS A RAM\nBut if he wants to PEAR what he wins\nHe\'ll find the next clue when he CHICKEN SPINS\n',
    hint: 'ch<:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750> | i<:holder:881755396686110750> | p<:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750>',
},
{
    react: '💯',
    text: 'your friend has helped with this next clue\nyou need only what he has left for you\na front end coder and man of taste\nhe wears converse and plays the bass\nit\'s with a driver who should be more cautious\nboth of them are young & nauseous',
    hint: 'what is Caleb watching? try changing the channel',
    editHint: 'your **fr**iend has h**e**lpe**d** with this next clue\nyou nee**d** only what he has left for **y**ou\na **fr**ont **e**nd cod**e**r and **m**an of taste\nhe we**a**rs co**n**verse and plays the bass\nit\'s with a driver who should be more cautious\nboth of them are young & nauseous',
}
];

let curStep;
let gameOver;
module.exports = {
    name: 'scav',
    description: 'initiates scavenger hunt',
    execute(message){
        curStep=0;
        gameOver=false;
        const embed = new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle('Happy Birthday Covey!')
            .setDescription('something something happy birthday, we made a little scavenger hunt for u bc uno reverse...ill make this better later lolz')
            .addField('How to Play', 'Once you begin, this message will be edited to contain various clues relating to you, your incredible accomplishments, and the people who love you. Follow the clues correctly, and you should find that an emoji has been left where it leads. React to this message with the correct emoji to move on to the next hint! If you\'re really stumped, instead react with ❔ to receive a helpful hint. To get started, react with 👍. ')

        message.channel.send({embeds: [embed]})    

        .then(function (msg) {
            const collector = msg.createReactionCollector(filter);
            
            msg.react('👍');

            collector.on('collect', (reaction, user) => {
                let emojiname = reaction.emoji.name;

                if (gameOver){
                    return;
                }
                else if (curStep == 0 && emojiname == '👍' && user.id == ccid){
                    reaction.remove()
                        .catch (err => console.log('failed to remove reaction'));
                    msg.edit({embeds: [start()]});
                    if (!gameOver){
                        console.log('in the if statement');
                        msg.react('❔');
                    }
                }
                else if (emojiname == steps[curStep].react && user.id == ccid){
                    msg.reactions.removeAll()
                        .catch (err => console.log('failed to remove reaction'));

                    msg.edit({embeds: [nextClue(message)]});
                    console.log(curStep);
                    console.log(steps.length);
                    console.log(gameOver);
                    if (!gameOver){
                        console.log('in the if statement');
                        msg.react('❔');
                    }
                }
                else if (emojiname == qmark && user == ccid){
                    msg.reactions.removeAll()
                        .catch (err => console.log('failed to remove reaction'));
                    msg.edit({embeds: [giveHint()]});
                }
                console.log(emojiname);
            })
            collector.on('end', collected => {
                //collector will end when he wins the hunt
                console.log(`Collected ${collected.size} items`);
            });
        });
    }
}
function filter(user){
    return (!user.bot);
}

function start(){
    return new Discord.MessageEmbed()
        .setColor('#429196')
        .setTitle(`Happy Birthday Covey ~ Step ${curStep+1}`)
        .setDescription(steps[curStep].text);
}

function nextClue(message){
    if (curStep == steps.length-1){
        gameOver=true;
        let role = message.guild.roles.cache.find(r => r.id === tooth_id);
        if (role){
            let member = message.guild.members.cache.get(ccid);
            member.roles.add(role);
        }
        else {
            console.log("failed to find role");
        }
        return new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle('🎉 Happy Birthday Covey ~ You Won! 🎉')
            .setDescription('Congratulations on completing the scavenger hunt! The <#929133108073214012> channel has been unlocked - feel free to peruse the messages and art people have left for you, and thanks so much for playing.');
    }
    curStep++;
    return new Discord.MessageEmbed()
        .setColor('#429196')
        .setTitle(`Happy Birthday Covey ~ Step ${curStep+1}`)
        .setDescription(steps[curStep].text);
}

function giveHint(){
    if (steps[curStep].editHint){
        return new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle(`Happy Birthday Covey ~ Step ${curStep+1}`)
            .setDescription(steps[curStep].editHint)
            .addField('Hint', steps[curStep].hint); 
    }
    else {
        return new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle(`Happy Birthday Covey ~ Step ${curStep+1}`)
            .setDescription(steps[curStep].text)
            .addField('Hint', steps[curStep].hint);   
    }
}
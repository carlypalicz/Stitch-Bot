const Discord = require('discord.js');
const qmark = '❔';
const tooth_id = "929132635798794240";
const ccid = "427579289102188575";

let steps = [
{
    react: '🦊',
    text: 'the first puzzle to solve will go here. react with a fox emoji to move to clue 2, or a question mark for a hint',
    hint: 'u received a clue for puzzle 1',
},
{
    react: '🐀',
    text: 'the second puzzle to solve will go here. react with a rat emoji to move to clue 3, or a question mark for a hint',
    hint: 'u received a clue for puzzle 2',
},
{
    react: '💀',
    text: 'the third puzzle to solve will go here. react with a skull emoji to win, or a question mark for a hint',
    hint: 'u received a clue for puzzle 3',
}];
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
            collector.on('collect', (reaction, user) => {
                let emojiname = reaction.emoji.name;

                if (gameOver){
                    return;
                }
                else if (curStep == 0 && emojiname == '👍' && user.id == ccid){
                    msg.edit({embeds: [start()]});
                    msg.react('👍');
                }
                else if (emojiname == steps[curStep].react && user.id == ccid){
                    msg.edit({embeds: [nextClue(message)]});
                    msg.react('❔');
                }
                else if (emojiname == qmark && user == ccid){
                    msg.edit({embeds: [giveHint()]});
                }
                reaction.remove()
                    .catch (err => console.log('failed to remove reaction'));
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
            console.log("hmmmmmm");
        }
        return new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle('Happy Birthday Covey ~ You Won!')
            .setDescription('woohooooo');
    }
    curStep++;
    return new Discord.MessageEmbed()
        .setColor('#429196')
        .setTitle(`Happy Birthday Covey ~ Step ${curStep+1}`)
        .setDescription(steps[curStep].text);
}

function giveHint(){
    return new Discord.MessageEmbed()
        .setColor('#429196')
        .setTitle(`Happy Birthday Covey ~ Step ${curStep+1}`)
        .setDescription(steps[curStep].text)
        .addField('Hint', steps[curStep].hint);
}
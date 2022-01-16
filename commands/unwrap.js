const Discord = require('discord.js');
const profileModel = require('../models/profileSchema');

const tooth_id = "929132635798794240";
const ccid = "427579289102188575";
const cov_id = "780316257638940674";
const nwh = "925228232087842876";

let steps = [
{
    react: '🦭',
    text: 'This is your *Starter* 4 the scavenger hunt\nHe is captured in an old self you must now confront\nHis body parts you stuck together\nAnd need protection from cloudy eyes\' weather',
    hint: 'TOMMY used hint - it\'s super effective! What? TOMMY is evolving! TOMMY evolved into BOBBY',
},
{
    react: '🐸',
    text: 'You sung in places no one goes\nSharing songs of lonely prose\nDocumented day by day\nJust on a trip to get away',
    hint: 'September 2020\nDuring the peak of quarantine',
},
{
    react: '💯',
    text: 'your friend has helped with this next clue\nyou need only what he has left for you\na front end coder and man of taste\nhe wears converse and plays the bass\nhe left it with a driver who should be more cautious\nboth of them are young & *nauseous*',
    hint: 'what is Caleb watching? try changing the #channel',
    editHint: 'your **fr**iend has h**e**lpe**d** with this next clue\nyou nee**d** only what he has left for **y**ou\na **fr**ont **e**nd cod**e**r and **m**an of taste\nhe we**a**rs co**n**verse and plays the bass\nit\'s with a driver who should be more cautious\nboth of them are young & nauseous',
},
{
    react: '🍌',
    text: 'Now he\'ll TARTS the next clue as only he can\nHe pets a horse, he NAGS A RAM\nBut if he wants to PEAR what he wins\nHe\'ll find the next clue when he CHICKEN SPINS\n',
    hint: 'cut on the crease -> cancerous teeth\n\nch<:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750> | i<:holder:881755396686110750> | p<:holder:881755396686110750><:holder:881755396686110750><:holder:881755396686110750>',
},
{
    react: '👺',
    text: 'It\'s no secret to anyone this year was significant\nNew days were filled with sights so magnificent\nSigned records were bought - the new album dropped\nTell-tale distress signals made live streams get stopped\nAll theorists sighed learning the Y was a fox\nBones in the attic signified a team\'s loss\nIn search of signs to uncover what\'s next\nOne must catch sight of the pattern we left',
    hint: '1 19 19 1 19 19 9 14 15 6 25 15 21 20 8',
    editHint:'It\'s no secret to anyone this year was **significant**\nNew days were filled with **sights** so magnificent\n**Signed** records were bought - the new album dropped\nTell-tale distress **signals** made live streams get stopped\nAll theorists **sighed** learning the Y was a fox\nBones in the attic **signified** a team\'s loss\nIn search of **signs** to uncover what\'s next\nOne must catch **sight** of the pattern we **left**',
},
{
    react: '🌙',
    text: 'We know you\'re not a fan of math\nSo rather than stats and counts accrued\nTo reveal the last step of your path\nYour *other* numbers you must pursue\n\nThe first in each row is the work you need\nWhich piece within it then proceeds\n\nAs for what comes from column three\nA compliment we give to thee:\nA man of many **words** are you\nWe hope it\'s alright we borrowed a few\n\n2 / 8 / 2\n2 / 6 / 1\n1 / 9 / 3\n2 / 3 / 2\n3 / 1 / 2-3\n3 / 4 / 1-2-3\n3 / 9 / 1',
    hint: 'works 1 and 3\ncontain 10 each\nthere\'s 12 in number 2\nthe prose within\nyou do not need\nfrom just the titles will do',
},
];

let curStep;
let gameOver;

module.exports = {
    name: 'unwrap',
    description: 'initiates scavenger hunt',
    execute(message, profileData){

        if (profileData.userID != cov_id && profileData.userID != ccid){
            return message.channel.send("(bonks you on the head) hey !! this is for the birthday boomer only");
        }
        
        curStep=0;
        gameOver=false;
        const embed = new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle('Happy Birthday Covey!')
            .setDescription('Happy Birthday homie - we figured it was time the roles got reversed - so we put together a scavenger hunt for you to solve.')
            .addField('How to Play', 'Once you begin, this message will be edited to contain various clues relating to you, your incredible accomplishments, and the people who love you.\n\nInterpreting each clue correctly should point you somewhere online, be it in the server, on social media, etc.\n\nIf you find the right location, you should see that **an emoji has been placed there for you to find.**\n\n**React (not reply) to this message with the correct emoji to move on to the next clue!**\n\nFor example: if deciphering a clue indicated to see what Stitch Bot is up to, you might check his status. In this case, the correct answer would be reacting with 🎈.\n\nIf you\'re stumped, react to any clue with ❔ to receive a helpful hint.\n\nTo get started, react with 👍. ')

        message.channel.send({embeds: [embed]})    

        .then(function (msg) {
            const collector = msg.createReactionCollector(filter);
            
            msg.react('👍');

            collector.on('collect', (reaction, user) => {
                let emojiname = reaction.emoji.name;

                if (gameOver){
                    return;
                }
                else if (curStep == 0 && emojiname == '👍' && (user.id == ccid || user.id == cov_id)){
                    reaction.remove()
                        .catch (err => console.log('failed to remove reaction'));
                    msg.edit({embeds: [start()]});
                    if (!gameOver){
                        console.log('in the if statement');
                        msg.react('❔');
                    }
                }
                else if (emojiname == steps[curStep].react && (user.id == ccid || user.id == cov_id)){
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
                else if (emojiname == '❔' && (user.id == cov_id || user.id == ccid)){
                    msg.reactions.removeAll()
                        .catch (err => console.log('failed to remove reaction'));
                    msg.edit({embeds: [giveHint()]});
                }
                else if (!user.bot && emojiname !== '👍' && emojiname !== '❔'){
                    reaction.remove();
                }
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
        .setTitle(`Happy Birthday Covey ~ Step ${curStep+1} / 6`)
        .addField("Reminders", "React with the '❔' for an additional hint. React with the emoji left at the hinted destination to move on to the next clue.")
        .addField("Clue", steps[curStep].text)
}

function nextClue(message){
    if (curStep == steps.length-1){
        gameOver=true;
        let role = message.guild.roles.cache.find(r => r.id === nwh);
        if (role){
            let member = message.guild.members.cache.get(cov_id);
            member.roles.add(role);
        }
        else {
            console.log("failed to find role");
        }
        return new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle('🎉 Happy Birthday Covey ~ You Won! 🎉')
            .setDescription('Congratulations on completing the scavenger hunt!\n\nThe <#929133108073214012> channel has been unlocked for you - feel free to peruse the messages and art everyone has left for you, and thanks so much for playing!');
    }
    curStep++;
    return new Discord.MessageEmbed()
        .setColor('#429196')
        .setTitle(`Happy Birthday Covey ~ Step ${curStep+1} / 6`)
        .addField("Reminders", "React with the '❔' for an additional hint. React with the emoji left at the hinted destination to move on to the next clue.")
        .addField("Clue", steps[curStep].text);
}

function giveHint(){
    if (steps[curStep].editHint){
        return new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle(`Happy Birthday Covey ~ Step ${curStep+1} / 6`)
            .addField("Reminders", "React with the emoji left at the hinted destination to move on to the next clue.")
            .addField("Clue", steps[curStep].editHint)
            .addField('Hint', steps[curStep].hint); 
    }
    else {
        return new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle(`Happy Birthday Covey ~ Step ${curStep+1} / 6`)
            .addField("Reminders", "React with the emoji left at the hinted destination to move on to the next clue.")
            .addField("Clue", steps[curStep].text)
            .addField('Hint', steps[curStep].hint);   
    }
}

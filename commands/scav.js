const Discord = require('discord.js');

const qmark = '❔';

const steps = new Map();
steps.set('1', {
    react: '🦊',
    text: 'the first puzzle to solve will go here. react with a fox emoji to move to clue 2, or a question mark for a hint',
    hint: 'u received a clue for puzzle 1',
})
steps.set('2', {
    react: '🐀',
    text: 'the second puzzle to solve will go here. react with a rat emoji to move to clue 3, or a question mark for a hint',
    hint: 'u received a clue for puzzle 2',
})
steps.set('3', {
    react: '💀',
    text: 'the third puzzle to solve will go here. react with a skull emoji to win, or a question mark for a hint',
    hint: 'u received a clue for puzzle 3',
})

module.exports = {
    name: 'scav',
    description: 'initiates scavenger hunt',
    execute(message){
        const embed = new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle('Happy Birthday Covey!')
            .setDescription('intro to the hunt will go here!')

        message.channel.send({embeds: [embed]})    

        .then(function (msg) {
            const collector = msg.createReactionCollector(filter);

            collector.on('collect', (reaction, user) => {
                let emojiname = reaction.emoji.name;
                console.log(emojiname);

                msg.edit('u replied with an emoji..swag');
            })

            collector.on('end', collected => {
                //collector will end when he wins the hunt
                console.log(`Collected ${collected.size} items`);
            })
        });
    }
}

function filter(reaction, user){
    return (!user.bot);
}
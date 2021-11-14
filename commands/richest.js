const profileModel = require('../models/profileSchema');
const Discord = require('discord.js');

module.exports = {
    name: 'richest',
    description: 'richest command',
    async execute(message, args, name){
        const richest = await profileModel.find().sort({ylapples:-1}).limit(10);
        console.log(message.guild.members.cache.get(richest[0].serverID));

        const embed = new Discord.MessageEmbed()
            .setColor('A91B0D')
            .setTitle('CCS Ylapples Leaderboard')
            .addField('1. '+ message.guild.members.cache.get(richest[0].serverID).username, '<:ylapples:826531088188440588> ' + richest[0].ylapples)
            .addField('2. '+ message.guild.members.cache.get(richest[1].serverID).username, '<:ylapples:826531088188440588> ' + richest[1].ylapples)
            .addField('3. '+ message.guild.members.cache.get(richest[2].serverID).username, '<:ylapples:826531088188440588> ' + richest[2].ylapples)
            .addField('4. '+ message.guild.members.cache.get(richest[3].serverID).username, '<:ylapples:826531088188440588> ' + richest[3].ylapples)
            .addField('5. '+ message.guild.members.cache.get(richest[4].serverID).username, '<:ylapples:826531088188440588> ' + richest[4].ylapples)
            .addField('6. '+ message.guild.members.cache.get(richest[5].serverID).username, '<:ylapples:826531088188440588> ' + richest[5].ylapples)
            .addField('7. '+ message.guild.members.cache.get(richest[6].serverID).username, '<:ylapples:826531088188440588> ' + richest[6].ylapples)
            .addField('8. '+ message.guild.members.cache.get(richest[7].serverID).username, '<:ylapples:826531088188440588> ' + richest[7].ylapples)
            .addField('9. '+ message.guild.members.cache.get(richest[8].serverID).username, '<:ylapples:826531088188440588> ' + richest[8].ylapples)
            .addField('10. '+ message.guild.members.cache.get(richest[9].serverID).username, '<:ylapples:826531088188440588> ' + richest[9].ylapples)
            .setTimestamp();
        message.channel.send({embeds: [embed]})    

        console.log(richest);
        console.log("richest command executed");
    }
}
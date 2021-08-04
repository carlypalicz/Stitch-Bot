const profileModel = require('../models/profileSchema');
const Discord = require('discord.js');

module.exports = {
    name: 'richest',
    description: 'richest command',
    async execute(message, args, name){
        const richest = await profileModel.find().sort({ylapples:-1}).limit(10);

        const embed = new Discord.MessageEmbed()
            .setColor('A91B0D')
            .setTitle('CCS Ylapples Leaderboard')
            .addField(richest[0].name, '<:ylapples:826531088188440588> ' + richest[0].ylapples)
            .addField(richest[1].name, '<:ylapples:826531088188440588> ' + richest[1].ylapples)
            .addField(richest[2].name, '<:ylapples:826531088188440588> ' + richest[2].ylapples)
            .addField(richest[3].name, '<:ylapples:826531088188440588> ' + richest[3].ylapples)
            .addField(richest[4].name, '<:ylapples:826531088188440588> ' + richest[4].ylapples)
            .addField(richest[5].name, '<:ylapples:826531088188440588> ' + richest[5].ylapples)
            .addField(richest[6].name, '<:ylapples:826531088188440588> ' + richest[6].ylapples)
            .addField(richest[7].name, '<:ylapples:826531088188440588> ' + richest[7].ylapples)
            .addField(richest[8].name, '<:ylapples:826531088188440588> ' + richest[8].ylapples)
            .addField(richest[9].name, '<:ylapples:826531088188440588> ' + richest[9].ylapples)
            .setTimestamp();
        message.channel.send(embed)    

        console.log(richest);
        console.log("richest command executed");
    }
}
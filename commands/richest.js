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
            .addField('1. '+ richest[0].name, '<:ylapples:826531088188440588> ' + richest[0].ylapples)
            .addField('2. '+ richest[1].name, '<:ylapples:826531088188440588> ' + richest[1].ylapples)
            .addField('3. '+ richest[2].name, '<:ylapples:826531088188440588> ' + richest[2].ylapples)
            .addField('4. '+ richest[3].name, '<:ylapples:826531088188440588> ' + richest[3].ylapples)
            .addField('5. '+ richest[4].name, '<:ylapples:826531088188440588> ' + richest[4].ylapples)
            .addField('6. '+ richest[5].name, '<:ylapples:826531088188440588> ' + richest[5].ylapples)
            .addField('7. '+ richest[6].name, '<:ylapples:826531088188440588> ' + richest[6].ylapples)
            .addField('8. '+ richest[7].name, '<:ylapples:826531088188440588> ' + richest[7].ylapples)
            .addField('9. '+ richest[8].name, '<:ylapples:826531088188440588> ' + richest[8].ylapples)
            .addField('10. '+ richest[9].name, '<:ylapples:826531088188440588> ' + richest[9].ylapples)
            .setTimestamp();
        message.channel.send(embed)    

        console.log(richest);
        console.log("richest command executed");
    }
}
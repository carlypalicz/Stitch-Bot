const serverModel = require('../models/serverSchema');
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'richest',
    description: 'richest command',
    async execute(message, args, name){
        const richest = await profileModel.find().sort({ylapples:-1}).limit(10);

        const embed = new Discord.MessageEmbed()
            .setColor('A91B0D')
            .setTitle('CCS Ylapples Leaderboard')
            .setDescription(descrip)
            .addField(richest[0].name, richest[0].ylapples)
            .addField(richest[1].name, richest[1].ylapples)
            .addField(richest[2].name, richest[2].ylapples)
            .addField(richest[3].name, richest[3].ylapples)
            .addField(richest[4].name, richest[4].ylapples)
            .addField(richest[5].name, richest[5].ylapples)
            .addField(richest[6].name, richest[6].ylapples)
            .addField(richest[7].name, richest[7].ylapples)
            .addField(richest[8].name, richest[8].ylapples)
            .addField(richest[9].name, richest[9].ylapples)
            .setTimestamp();
        message.channel.send(embed)    

        console.log(richest);
        console.log("richest command executed");
    }
}
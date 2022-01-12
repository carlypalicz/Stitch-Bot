const Discord = require('discord.js');
module.exports = {
    name: 'scav',
    description: 'initiates scavenger hunt',
    execute(message){
        const embed = new Discord.MessageEmbed()
            .setColor('#429196')
            .setTitle('Happy Birthday Covey!')
            .setDescription('intro to the hunt will go here!')

        message.channel.send({embeds: [embed]});    
    }
}
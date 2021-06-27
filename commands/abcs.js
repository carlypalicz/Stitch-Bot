module.exports = {
    name: 'abcs',
    description: 'outputs key for stitch',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
            .setColor('#A91B0D')
            .setTitle('Learn Stitch With Me!')
            .setDescription('Here\'s a handy chart to help you learn stitch! Make note of the pattern in the letters to help you learn.')
            //.addField('Inline field title', 'Some value here', true)
            .setImage('https://github.com/carlypalicz/Stitch-Bot/blob/master/stitch_table.png?raw=true')
            .setTimestamp()
            .setFooter('type !introduce for help using Stitch Bot');

        message.channel.send(embed);
    }
}
module.exports = {
    name: 'balance',
    description: 'get a users balance',
    execute(message, args, profileData){
        message.channel.send(`You have ${profileData.ylapples} ylapples!`);
    }
}
module.exports = {
    name: 'balance',
    description: 'get a users balance',
    execute(message, args, profileData, name){
        message.channel.send(`Hey ${name}, you have ${profileData.ylapples} ylapples!`);
    }
}
module.exports = {
    name: 'react',
    description: 'add a reaction to a message',
    execute(message){
        message.channel.send("I will react to this!")
        .then(function (msg) {
            msg.react("👍")
        })
    }
}
module.exports = {
    name: 'ping',
    description: 'ping pong command',
    init: (client) => {
        console.log("init has run");
    },
    execute(message, args){
        message.channel.send('pong!');
    }
}
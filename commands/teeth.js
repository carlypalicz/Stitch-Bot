module.exports = {
    name: 'teeth',
    description: 'outputs 11 teeth',
    execute(message, args){
        let output = '';
        for (let i = 0; i < 11; i++){
            output += '🦷';
        }
        message.channel.send(output);    
    }
}
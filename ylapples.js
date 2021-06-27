module.exports = {
    name: 'ylapples',
    description: 'outputs 11 ylapples',
    execute(message, args){
        let output = '';
        for (let i = 0; i < 11; i++){
            output += '<:ylapples:826531088188440588>';
        }
        message.channel.send(output);    }
}
const ccid = '427579289102188575';
const tooth_id = '929132635798794240';

module.exports = {
    name: 'remrole',
    description: 'removes tooth role',
    execute(message){
        let output = '';
        for (let i = 0; i < 11; i++){
            output += '🦷';
        }
        message.channel.send(output);    
    }
}
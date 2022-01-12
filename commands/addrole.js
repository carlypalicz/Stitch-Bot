const ccid = '427579289102188575';
const tooth_id = '929132635798794240';
const yeet = '930708172107296798';

module.exports = {
    name: 'addrole',
    description: 'adds tooth role',
    execute(message){
        let role = message.guild.roles.cache.find(r => r.id === tooth_id);
        let member = message.guild.members.cache.get(ccid);
        member.roles.add(role);
    }
}
const ccid = '427579289102188575';
const tooth_id = '929132635798794240';

module.exports = {
    name: 'remrole',
    description: 'removes tooth role',
    execute(message){
        let role = message.guild.roles.cache.find(r => r.id === yeet);
        if (role){
            let member = message.guild.members.cache.get(ccid);
            member.roles.remove(role);
        }
        else {
            console.log("hmmmmmm");
        }
    }
}
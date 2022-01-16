const ccid = "427579289102188575";
const tooth_id = "929132635798794240";
const yeet = "930708172107296798";
const nwh = "925228232087842876";
const covey_id = "780316257638940674";

module.exports = {
    name: 'addrole',
    description: 'adds tooth role',
    execute(message){
        let role = message.guild.roles.cache.find(r => r.id === tooth_id);
        if (role){
            let member = message.guild.members.cache.get(covey_id);
            member.roles.add(role);
        }
        else {
            console.log("hmmmmmm");
        }
    }
}
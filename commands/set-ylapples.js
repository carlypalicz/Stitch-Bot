const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'set-ylapples',
    description: 'set ylapples for users - only carly has permission to do this',
    async execute(message, args, profileData){
        console.log(args);
        const recipient = args[0];
        const amount = args[1];
        
        console.log(recipient);
        console.log(amount);
        try {
            await profileModel.findOneAndUpdate({
                userID: recipient,
            }, {
                ylapples: amount
            });
        } catch(err){
            console.log(err);
        }
        return message.channel.send(`Updated the ylapples for ${recipient} to ${amount} ylapples!`);
    },
};

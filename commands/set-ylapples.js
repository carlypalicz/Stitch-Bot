const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'set-ylapples',
    description: 'set ylapples for users - only carly has permission to do this',
    async execute(message, args, profileData, name){
        const recipient = args[0];
        const amount = args[1];

        await profileModel.findOneAndUpdate({
            userID: profileData.recipient,
        }, {
            ylapples: amount
        });
        return message.channel.send(`Updated the ylapples for ${recipient} to ${amount} ylapples!`);
    },
};

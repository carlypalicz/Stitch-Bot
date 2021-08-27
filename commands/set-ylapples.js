const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'set-ylapples',
    description: 'set ylapples for users - only carly has permission to do this',
    async execute(message, args, profileData){
        if (profileData.userID != '427579289102188575'){
            return message.channel.send("(bonks you on the head) hey !! you do not have permission to use this command.");
        }

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
            return message.channel.send(`Updated the ylapples for ${recipient} to ${amount} ylapples!`);
        } catch(err){
            console.log(err);
            return message.channel.send('Something went wrong, please ask Carly to check the logs :/');
        }
    },
};

const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'daily',
    description: '',
    async execute(message, args, profileData, name){
        const reward = Math.floor(Math.random() * 44) + 11;
        const response = await profileModel.findOneAndUpdate({
            userID: profileData.userID,
        }, {
            $inc: {
                ylapples: reward,
            }
        });
        return message.channel.send(`You earned ${reward} ylapples!`);
    },
};
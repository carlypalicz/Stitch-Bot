const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'add-ylapples',
    description: '',
    async execute(message, args, profileData, name){
        const response = await profileModel.findOneAndUpdate({
            userID: profileData.userID,
        }, {
            $inc: {
                ylapples: 1,
            }
        });
        return message.channel.send("You earned 1 ylapple!");
    }
}
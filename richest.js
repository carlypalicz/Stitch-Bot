const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'richest',
    description: 'richest command',
    async execute(message, args, name){
        let accs = await profileModel.find({ylapples: {$gte: 0} }, 'userID ylapples').exec();
        console.log(accs);
    }
}
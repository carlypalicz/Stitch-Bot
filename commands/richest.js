const serverModel = require('../models/serverSchema');
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'richest',
    description: 'richest command',
    async execute(message, args, name){
        console.log(profileModel.find().sort({ylapples:-1}).limit(10));
        console.log("richest command executed");
    }
}
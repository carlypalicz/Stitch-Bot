const serverModel = require('../models/serverSchema');
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'richest',
    description: 'richest command',
    async execute(message, args, name){
        console.log("richest command executed");
    }
}
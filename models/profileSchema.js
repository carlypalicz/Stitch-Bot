const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true},
    ylapples: {type: Number, default: 0},
    lastDaily: {type: Number, default: 0},
    name: { type: String },
})

const serverSchema = new mongoose.Schema({
    richest: { type: String, require: true, unique: true},
    richestBalance: { type: Number, default: 0},
    coveyCrimeCounter: { type: Number, default: 0},
})

const model = mongoose.model('ProfileModels', profileSchema);
const serverModel = mongoose.model('serverModel', serverSchema);
module.exports = model;
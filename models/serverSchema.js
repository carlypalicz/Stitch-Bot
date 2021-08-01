const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    serverID: { type: String, require: true, unique: true},
    richest: { type: String, require: true},
    richestBalance: { type: Number, default: 0},
    coveyCrimeCounter: { type: Number, default: 0},
})

const model = mongoose.model('serverModel', serverSchema);

module.exports = model;
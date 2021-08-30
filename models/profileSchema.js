const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true},
    ylapples: {type: Number, default: 0},
    lastDaily: {type: Number, default: 0},
    lastHangman: {type: Number, default: 0},
    name: { type: String },
})



const model = mongoose.model('ProfileModels', profileSchema);
module.exports = model;
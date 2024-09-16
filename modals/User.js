// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin','commitee leader', 'user'],
        default: 'user',
    },

}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    roleId: {
        type: Schema.Types.ObjectId
    },
    role: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
})

userSchema.plugin(uniqueValidator, { message: 'Email already exists' });

module.exports = mongoose.model('User', userSchema);
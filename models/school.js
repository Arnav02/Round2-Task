const mongoose = require('mongoose');
const Student = require('./student');

const schoolSchema = new mongoose.Schema({
    name: String,
    city: String,
    state: String,
    country: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    students: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('School', schoolSchema);
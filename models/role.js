const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Role', roleSchema);
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId
    },
    created: {
        type: Date, default: Date.now()
    },
    updated: {
        type: Date, default: Date.now()
    }
})

module.exports = mongoose.model('Student', studentSchema);
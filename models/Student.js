const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide name'],
    },
    userId: {
        type: String,
        trim: true,
        required: [true, 'Please provide user ID'],
    },
    schoolId: {
        type: String,
        trim: true,
        required: [true, 'Please provide school ID'],
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Student', StudentSchema);
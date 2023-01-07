const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide Role name']
    },
    scopes: [{type: String}]
}, { timestamps: { createdAt: true, updatedAt: false }})

module.exports = mongoose.model('Role', RoleSchema);
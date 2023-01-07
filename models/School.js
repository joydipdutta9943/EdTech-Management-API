const mongoose = require('mongoose')

const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide school name'],
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'Please provide city name'],
    },
    state: {
        type: String,
        trim: true,
        required: [true, 'Please provide state name'],
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Please provide country name'],
    },
}, { timestamps: { createdAt: true, updatedAt: false }, toJSON: { virtuals: true }, toObject: { virtuals: true } })

SchoolSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'schoolId',
    justOne: false
})

module.exports = mongoose.model('School', SchoolSchema);
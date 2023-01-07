const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please provide first name'],
        maxlength: 50
    },
    last_name: {
        type: String,
        required: [true, 'Please provide last name'],
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        }
    },
    mobile: {
        type: Number,
        unique: true,
        required: [true, 'Please provide email'],
        validator: {
            validator: validator.isMobilePhone,
            message: 'Please provide valid Mobile Number',
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    roleId: {
        type: String,
        required: [true, 'Please provide Role ID']
    }
}, { timestamps: { createdAt: true, updatedAt: false } })

// Hashing the password before saving.
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
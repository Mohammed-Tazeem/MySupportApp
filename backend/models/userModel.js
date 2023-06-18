const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please Add']
    },
    email: {
        type: String,
        require: [true, 'Please Add an email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please Add an password'],

    },

    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    }
},
    {
        timestamps: true
    }

)

module.exports = mongoose.model('User', userSchema)
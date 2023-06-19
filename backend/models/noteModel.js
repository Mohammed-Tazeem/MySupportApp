const mongoose = require('mongoose')

const notesSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ticket'
        },
        text: {
            type: String,
            required: [true, 'Please Add some text'],

        },
        staffId: {
            type: String,

        },
        isStaff: {
            type: Boolean,
            default: false
        },


    },
    {
        timestamps: true
    }

)

module.exports = mongoose.model('Note', notesSchema)
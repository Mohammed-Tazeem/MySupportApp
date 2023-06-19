const asyncHandler = require('express-async-handler')


const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')



//@desc Get Notes for a ticket
//@route GET /api/tickets/:tickedId/notes
//@access Private
const getNotes = asyncHandler(async (req, res) => {

    //get user using the id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not Authorized')

    }


    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})


//@desc create for a ticket
//@route POST /api/tickets/:tickedId/notes
//@access Private

const addNote = asyncHandler(async (req, res) => {

    //get user using the id in JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not Authorized')
    }


    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        user: req.user.id,
        ticket: req.params.ticketId

    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote
}
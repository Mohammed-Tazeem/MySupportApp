
//@desc Register a New user
//@route /api/users/
//@access Public
const registerUser = (req, res) => {

    const { name, email, password } = req.body

    //Validation

    if (!name || !email || !password) {
        res.status(400).json({ message: 'Please include all fields' })
    }
    console.log(req.body)
    res.send('Register Route')
}

//@desc Login a user
//@route /api/users/login
//@access Public

const loginUser = (req, res) => {
    res.send('login Route')
}

module.exports = {
    registerUser,
    loginUser
}
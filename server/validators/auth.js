const { check } = require('express-validator')
const { User } = require('../models')
const { compare } = require('bcrypt')

//password
const password = check('password').isLength({ min: 4, max: 12 }).withMessage('Password has to be between 4 and 12 characters ');

//email
const email = check('email').isEmail().withMessage('Please provide a valid email.')

//check if email exists
const emailExists = check('email').custom(async (email) => {
    const row = await User.findOne({ where: { email } })
    if (row) throw new Error("Email already exists.")
})

//login validation 
const loginFieldsCheck = check('email').custom(async (email, { req }) => {
    const row = await User.findOne({ where: { email } })
    if (!row) throw new Error('Email does not exists.')

    const validPassword = await compare(req.body.password, row.password)
    if (!validPassword) throw new Error("Wrong password")

    if (row.status === 'pending') throw new Error('Your Account is not approved yet !')
    if (row.status === 'blocked') throw new Error('Sorry you are blocked by admin !')

    req.user = row
})

//status validation

module.exports = {
    registerValidation: [email, password, emailExists],
    loginValidation: [loginFieldsCheck]
}
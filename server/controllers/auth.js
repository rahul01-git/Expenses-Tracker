const { User,tags } = require('../models')
const { hash } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const hashedPass = await hash(password, 10)
        await User.create({
            first_name,
            last_name,
            email,
            password: hashedPass,
        })
        return res.status(201).json({ success: true, message: 'The registration was successful' })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.tags = async (req, res) => {
    const { user_id,tag_title,color } = req.body;
    console.log(user_id,tag_title,color)
    try {
        await tags.create({
            user_id,
            tag_title,
            color,
        })
        return res.status(201).json({ success: true, message: 'The tag added successful' })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}


exports.login = async (req, res) => {
    let user = req.user
    payload = {
        id: user.id,
        email: user.email
    }
    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 30 }).json({
            success: true,
            message: 'Logged in successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protected = async (req, res) => {
    const { id, email, first_name, last_name } = req.user;
    try {
        return res.status(200).json({ id, email, first_name, last_name })
    } catch (error) {
        console.log(error.message)
    }
}

exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', { httpOnly: true, maxAge: 1000 * 60 * 30 }).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}
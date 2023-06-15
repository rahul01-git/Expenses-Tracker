const { User, tags,Category } = require('../models')
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
    const { id, email, first_name, last_name,role } = req.user;
    try {
        return res.status(200).json({ id, email, first_name, last_name ,role})
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
exports.tags = async (req, res) => {
    const { user_id, tag_title, color } = req.body;
    console.log(user_id, tag_title, color)
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

exports.fetchTags = async (req, res) => {
    const id = req.params.id
    try {
        const rows = await tags.findAll({ where: { user_id: id, archived: false } });
        return res.status(200).json({ success: true, tags: rows })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.archiveTags = async (req, res) => {
    const id = req.params.id
    try {
        const tag = await tags.update(
            { archived: true },
            { where: { id: id } }
        )
        return res.status(200).json({ success: true, tag })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.category = async (req, res) => {
    const { created_by, category_name,description, color } = req.body;
    try {
        await Category.create({
            created_by,
            category_name,
            description,
            color,
        })
        return res.status(201).json({ success: true, message: 'The Category added successful' })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.fetchCategory = async (req, res) => {
    try {
        const rows = await Category.findAll();
        return res.status(200).json({ success: true, category: rows })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.deleteCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.destroy(
            { where: { id} }
        )
        return res.status(200).json({ success: true, category })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

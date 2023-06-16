const { User, tags, Category, Expense } = require('../models')
const { hash } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')
const { where } = require('sequelize')

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
    const { id, email, first_name, last_name, role, income, expenses } = req.user;
    try {
        return res.status(200).json({ id, email, first_name, last_name, role, income, expenses })
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
    const { created_by, category_name, description, color } = req.body;
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
            { where: { id } }
        )
        return res.status(200).json({ success: true, category })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.fetchExpenses = async (req, res) => {
    const id = req.params.id
    try {
        const rows = await Expense.findAll({ where: { user_id: id, soft_delete: false } });
        return res.status(200).json({ success: true, rows: rows })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.fetchDeletedExpenses = async (req, res) => {
    const id = req.params.id
    try {
        const rows = await Expense.findAll({ where: { user_id: id, soft_delete: true } });
        return res.status(200).json({ success: true, rows: rows })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.expenses = async (req, res) => {

    const {
        created_by,
        title,
        note,
        category_id,
        amount,
        expenses_date } = req.body;
    const currentDate = new Date();


    if (category_id == '') return res.status(400).json({ error: 'Please Select Category' });

    // Convert the expenses_date string to a Date object
    const expensesDateObj = new Date(expenses_date);

    if (expensesDateObj <= currentDate) {
        try {
            await Expense.create({
                user_id: created_by,
                title,
                note,
                category_id: parseInt(category_id, 10),
                amount,
                expenses_date
            });
            return res.status(201).json({ success: true, message: 'New Expense added successfully' });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    } else {
        return res.status(400).json({ error: 'Invalid Expense Date. It must be smaller than or equal to the current date.' });
    }
}

exports.softDeleteExpenses = async (req, res) => {
    const id = req.params.id
    try {
        const expense = await Expense.update(
            { soft_delete: true },
            { where: { id } }
        )
        return res.status(200).json({ success: true, expense })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.recoverExpenses = async (req, res) => {
    const id = req.params.id
    try {
        const expense = await Expense.update(
            { soft_delete: false },
            { where: { id } }
        )
        return res.status(200).json({ success: true, expense })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.deleteExpenses = async (req, res) => {
    const id = req.params.id
    try {
        const expense = await Expense.destroy(
            { where: { id } }
        )
        return res.status(200).json({ success: true, expense })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.fetchUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({ success: true, users })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.changeStatus = async (req, res) => {
    const {value} = req.body
    const id = req.params.id
    console.log(value,id)
    try {
        const users = await User.update({status:value},{where:{id}});
        return res.status(200).json({ success: true, users })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
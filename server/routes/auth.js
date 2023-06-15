const { Router } = require('express')
const router = Router()

const { register, login, protected, logout } = require('../controllers/auth')
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { userAuth } = require('../middlewares/auth-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')

router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router
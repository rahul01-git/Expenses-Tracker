const { Router } = require('express')
const router = Router()

const { register, login, protected, logout,tags } = require('../controllers/auth')
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { userAuth } = require('../middlewares/auth-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { populateUser } = require('../middlewares/populate-middleware')

router.get('/protected', userAuth,populateUser ,protected)
router.post('/tags',userAuth,tags)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router
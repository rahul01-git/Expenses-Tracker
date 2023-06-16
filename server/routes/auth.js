const { Router } = require('express')
const router = Router()

const { register, login, protected, logout,tags,fetchTags,archiveTags,category,fetchCategory ,deleteCategory,fetchExpenses, expenses,deleteExpenses, fetchDeletedExpenses, softDeleteExpenses, recoverExpenses, fetchUsers, changeStatus, changeRole} = require('../controllers/auth')
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { userAuth } = require('../middlewares/auth-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { populateUser, populateAmount } = require('../middlewares/populate-middleware')

router.get('/protected', userAuth,populateUser ,protected)

router.post('/tags',userAuth,tags)
router.get('/tags/:id',userAuth,fetchTags)
router.put('/tags/:id',userAuth,archiveTags)

router.post('/category',userAuth,category)
router.get('/category',userAuth,fetchCategory)
router.delete('/category/:id',userAuth,deleteCategory)

router.get('/expenses/:id',userAuth,fetchExpenses)
router.get('/expenses/deleted/:id',userAuth,fetchDeletedExpenses)
router.post('/expenses',userAuth,expenses)
router.put('/expenses/:id',userAuth,softDeleteExpenses)
router.put('/expenses/recover/:id',userAuth,recoverExpenses)
router.delete('/expenses/:id',userAuth,deleteExpenses)

router.get('/users',userAuth,fetchUsers)
router.put('/users/status/:id',userAuth,changeStatus)
router.put('/users/role/:id',userAuth,changeRole)

router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router
//import
const express = require('express')
const app = express()
const {PORT,CLIENT_URL} = require('./constants')
const cookieParser = require("cookie-parser")
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')

//import passport middleware
require('./middlewares/passport-middleware')

//init
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({origin:CLIENT_URL,credentials: true}))
app.use(passport.initialize())



//auth routes
app.use('/api',require('./routes/auth'))

//spin server
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))
const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const { User } = require('../models')

const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(opts, async ({ id }, done) => {
        try {
            const row = await User.findOne({ where: { id} })
            if (!row) throw new Error('401 not authorized')

            let user = { id: row.id, email: row.email, first_name: row.first_name, last_name: row.last_name, role:row.role }

            return await done(null, user)
        } catch (error) {
            console.log(error.message);
            done(null, false)
        }
    })
)
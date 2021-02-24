const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = async (user) => {
    const authNumber = Math.random() + ''
    const token = jwt.sign({
        login: user.login,
        userId: user._id,
        authNumber
    }, `${config.jwt}`, {
        expiresIn: '6h'
    })
    user.authNumber = authNumber
    await user.save()
    return token
} 
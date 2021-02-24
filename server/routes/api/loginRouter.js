const experess = require('express')
const bcrypt = require('bcryptjs')
const router = experess.Router()
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const config = require('../../config/config')
const errorHandler = require('../../utils/errorHandler')
const generateToken = require('../../utils/generateToken')

/*
Поиск пользователя в базе данных по логину,
проверка правильности ввода пароля,
выдача токена пользователю
*/
router.post('/login', async (req, res) => {
    const login = req.body.login.toLowerCase()
    const user = await User.findOne({ login })
    if (!user) {
        errorHandler(new Error('Неправильный логин или пароль'), res, 409)
    } else {
        const password = req.body.password
        const passwordResult = await bcrypt.compare(password, user.passwordHash)
        if (passwordResult) {
            const token = await generateToken(user)
            res.status(200).json({
                token
            })
        } else {
            errorHandler(new Error('Неправильный логин или пароль'), res, 409)
        }
    }
})

module.exports = router
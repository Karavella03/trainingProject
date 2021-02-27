const experess = require('express')
const router = experess.Router()
const User = require('../../models/User')
const errorHandler = require('../../utils/errorHandler')
const generateToken = require('../../utils/generateToken')
const checkPassword = require('../../utils/checkPassword')

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
        const passwordResult = await checkPassword(user.passwordHash, password)
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
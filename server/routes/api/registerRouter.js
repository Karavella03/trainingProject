const experess = require('express')
const bcrypt = require('bcryptjs')
const router = experess.Router()
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const User = require('../../models/User')
const errorHandler = require('../../utils/errorHandler')
const generateToken = require('../../utils/generateToken')

/*
Регистрация пользователя
Проверка логина на уникальность, создание пользователя по его модели,
запись пользователя в базу данных,
выдача токена пользователю
*/
router.post('/register', async (req, res) => {
    const login = req.body.login.toLowerCase()
    const conditate = await User.findOne({ login })
    if (conditate) {
        errorHandler(new Error('Пользователь уже существует'), res, 409)
    } else {
        const salt = await bcrypt.genSalt(10)
        const password = req.body.password
        const passwordHash = await bcrypt.hash(password, salt)
        const user = new User({
            login,
            passwordHash,
            name: req.body.name,
            surname: req.body.surname,
            description: req.body.description
        })
        try {
            await user.save()
            const token = await generateToken(user)
            res.status(200).json({
                token
            })
        } catch (err) {
            errorHandler(err, res)
        }
    }
})

module.exports = router
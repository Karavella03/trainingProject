const experess = require('express')
const bcrypt = require('bcryptjs')
const router = experess.Router()
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

router.post('/register', async (req, res) => {
    console.log(req.body)
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
            res.status(200).json(user)
        } catch (err) {
            errorHandler(err, res)
        }
    }
})

module.exports = router
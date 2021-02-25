const express = require('express')
const router = express.Router()

//Страница входа
router.get('/login', (req, res) => {
    res.render('login.hbs')
})

//Страница регистрации
router.get('/register', (req, res) => {
    res.render('register.hbs')
})

router.get('/', (req, res) => {
    res.send('<h1>Later...</h1>')
})

//Страница пользователя
router.get('/user', async (req, res) => {
    res.render('user.hbs')
})

module.exports = router
const express = require('express')
const router = express.Router()

//Страница входа
router.get('/login', (req, res) => {
    res.render('auth/login.hbs')
})

//Страница регистрации
router.get('/register', (req, res) => {
    res.render('auth/register.hbs')
})

router.get('/', (req, res) => {
    res.send('<h1>Later...</h1>')
})

//Страница пользователя
router.get('/user', async (req, res) => {
    res.render('user/userPage.hbs')
})

//Страница группы
router.get('/group', async (req, res) => {
    res.render('group/groupPage.hbs')
})


//Страница настроек пользователя
router.get('/user/settings', async (req, res) => {
    res.render('user/userSettings.hbs')
})

//Страница создания группы
router.get('/group/create', async (req, res) => {
    res.render('group/createGroup.hbs')
})

//Выход из аккаунта
router.get('/logout', async (req, res) => {
    res.render('auth/logout.hbs')
})

module.exports = router
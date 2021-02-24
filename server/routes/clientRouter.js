const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login.hbs')
})

router.get('/register', (req, res) => {
    res.render('register.hbs')
})

router.get('/', (req, res) => {
    res.send('<h1>Main</h1>')
})

module.exports = router
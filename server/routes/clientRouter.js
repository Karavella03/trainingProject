const express = require('express')
const router = express.Router()

router.use('/login', (req, res) => {
    res.render('login.hbs')
})

router.use('/', (req, res) => {
    res.send('<h1>Main</h1>')
})

module.exports = router
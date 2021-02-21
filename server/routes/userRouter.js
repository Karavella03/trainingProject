const express = require('express')
const router = express.Router()
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

router.get('/user:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id пользователя'), res)
    }
    const user = await User.findOne({ _id: req.params.id })
    if (user) {
        res.status(200).json(user)
    }
    errorHandler(new Error('Неверный id пользователя'), res)
})

module.exports = router

const jwt = require('jsonwebtoken')
const config = require('../config/config')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')

/*
Проверка токена из заголовка с помощью jswebtoken,
запись объекта пользователя, полученного из базы данных, в request
*/
module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        await jwt.verify(req.headers.authorization.split(' ')[1],
            config.jwt,
            async (err, payload) => {
                if (err) {
                    errorHandler(err, res, 401)
                }
                else if (payload) {
                    const user = await User.findOne({ _id: payload.userId })
                    if (!user) {
                        errorHandler(new Error('Ошибка авторизации'), res, 401)
                    }
                    req.user = user
                    next()
                }
            })
    }
    else {
        errorHandler(new Error('Ошибка авторизации'), res, 401)
    }
}
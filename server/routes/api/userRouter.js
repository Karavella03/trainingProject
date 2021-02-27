const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Group = require('../../models/Group')
const Record = require('../../models/Record')
const errorHandler = require('../../utils/errorHandler')
const generatePasswordHash = require('../../utils/generatePasswordHash')
const checkPassword = require('../../utils/checkPassword')

//Получение пользователя
router.get('/user', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        userObject = user.toObject()
        userObject.isOwner = true
        res.status(200).json(userObject)
    } catch (err) {
        errorHandler(err, res)
    }
})

//Получение пользователя по id
router.get('/user/:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id пользователя'), res, 404)
    }
    let user
    try {
        user = await User.findOne({ _id: req.params.id })
    } catch (err) {
        errorHandler(err, res, 404)
    }
    if (user) {
        user.isOwner = req.user.id === req.params.id
        res.status(200).json(user)
    }
})

//Смена пароля пользователя
router.post('/user/changepassword', async (req, res) => {
    const passwordResult = await checkPassword(req.user.passwordHash, req.body.password)
    if (passwordResult) {
        try {
            const passwordHash = await generatePasswordHash(req.body.newPassword)
            const user = await User.findOneAndUpdate(
                { _id: req.user.id },
                { $set: { passwordHash } },
                { new: true }
            )
            res.status(200).json(user)
        } catch (err) {
            errorHandler(err, res)
        }
    } else {
        errorHandler(new Error('Введён неверный старый пароль'), res, 403)
    }
})

//Обновление пользователя
router.post('/user', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(user)
    } catch (err) {
        errorHandler(err, res)
    }
})

//удаление пользователя
router.delete('/user', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        user.groups.forEach(async groupId => {
            await Group.updateOne({ _id: groupId },
                {
                    $pull: { 'subscribers': req.user.id },
                    $pull: { 'members': req.user.id }
                })
        });
        user.records.forEach(async recordId => {
            await Record.updateOne({ _id: recordId },
                { $pull: { 'users': req.user.id } })
        });
        await User.remove({ _id: req.params.id })
        res.status(200).json({ message: 'User was deleted' })
    } catch (error) {
        errorHandler(err, res)
    }
})

module.exports = router

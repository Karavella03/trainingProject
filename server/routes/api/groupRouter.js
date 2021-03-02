const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Group = require('../../models/Group')
const Record = require('../../models/Record')
const errorHandler = require('../../utils/errorHandler')

//Создание группы
router.put('/group', async (req, res) => {
    if (!req.body.name) {
        errorHandler(new Error('Укажите название группы'), res)
    }
    const group = new Group({
        name: req.body.name,
        description: req.body.description,
        subscribers: [req.user],
        members: [req.user],
    })
    await group.save()
    req.user.groups.push(group)
    req.user.save()
    res.status(200).json(group)
})

//Получение группы по id
router.get('/group/:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id группы'), res)
    }
    try {
        const group = await Group.findOne({ _id: req.params.id })
        res.status(200).json(group)
    } catch (err) {
        errorHandler(err, res)
    }
})

//Изменение группы по id, редактировать группу могут только её участники. Подписчики и остальные пользователи не могут.
router.post('/group/:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id группы'), res)
    }
    try {
        const group = await Group.findOne({ _id: req.params.id })
        if (!group.members.includes(req.user._id)) {
            errorHandler(new Error('Отказано в доступе'), res, 403)
        }
        for (key in group) {
            group[key] = req.body[key] ?? group[key]
        }
        await group.save()
        res.status(200).json(group)
    } catch (err) {
        errorHandler(err, res)
    }
})

//подписка или отписка от группы
router.post('/group/subscribe/:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id группы'), res)
    }
    try {
        let group = await Group.findOne({ _id: req.params.id })
        if (group.subscribers.includes(req.user._id)) {
            group = await Group.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { 'subscribers': req.user._id } },
                { new: true }
            )
            await User.updateOne(
                { _id: req.user },
                { $pull: { 'groups': req.params.id } },
                { new: true }
            )
        } else {
            group = await Group.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { 'subscribers': req.user } },
                { new: true }
            )
            await User.updateOne(
                { _id: req.user },
                { $push: { 'groups': req.params.id } },
                { new: true }
            )
        }
        res.status(200).json(group)
    } catch (err) {
        errorHandler(err, res)
    }
})

//Удаление группы по id
router.delete('/group/:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id группы'), res)
    }
    try {
        const group = await Group.findOne({ _id: req.params.id })
        if (!group.members.includes(req.user._id)) {
            errorHandler(new Error('Отказано в доступе'), res, 403)
        }
        group.users.forEach(async userId => {
            await User.updateOne({ _id: userId },
                { $pull: { 'groups': req.params.id } })
        });
        group.records.forEach(async recordId => {
            await Record.updateOne({ _id: recordId },
                { $pull: { 'users': req.params.id } })
        });
        await Group.remove({ _id: req.params.id })
        res.status(200).json({ message: 'Group was deleted' })
    } catch (error) {
        errorHandler(err, res)
    }
})

module.exports = router

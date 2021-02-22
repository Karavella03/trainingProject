const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Group = require('../models/Group')
const Record = require('../models/Record')
const errorHandler = require('../utils/errorHandler')

//create group
router.put('/group', async (req, res) => {
    if (!req.body.name) {
        errorHandler(new Error('Укажите название группы'), res)
    }
    const group = new Group({
        name: req.body.name,
        description: req.body.description,
        users: [req.user],
    })
    await group.save()
    req.user.groups.push(group)
    req.user.save()
    res.status(200).json(group)
})

//get group by id
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

//update group
router.post('/group/:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id группы'), res)
    }
    try {
        const group = await Group.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(group)
    } catch (err) {
        errorHandler(err, res)
    }
})

//delete group
router.delete('/group/:id', async (req, res) => {
    if (!req.params.id) {
        errorHandler(new Error('Неверный id группы'), res)
    }
    try {
        const group = await Group.findOne({ _id: req.params.id })
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

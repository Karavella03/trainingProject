const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userScheme = new Schema({
    login: {
        type: String,
        required: 'Введите логин',
        unique: true
    },
    passwordHash: {
        type: String,
        required: 'Введите пароль'
    },
    name: {
        type: String,
        required: 'Укажите имя'
    },
    surname: {
        type: String,
        required: 'Укажите фамилию'
    },
    description: {
        type: String
    },
    groups: [{
        ref: 'groups',
        type: Schema.Types.ObjectId
    }],
    records: [{
        ref: 'records',
        type: Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('User', userScheme)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

/*
Модель пользователя, пользователь состоит из
логина, хэша парля, имени, фамилии, описания пользователя,
списка групп, в коорых состоит пользователь,
списка записей, автором которых является пользователь
*/
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
    authNumber: {
        type: String,
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
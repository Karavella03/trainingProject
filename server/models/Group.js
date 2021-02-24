const mongoose = require("mongoose")
const Schema = mongoose.Schema

/* 
Модель группы, группа состоиз из
названия, описания, списка участников,
списка записей опубликованных в этой группе,
списка пользователей с особыми правами в группе
*/
const groupScheme = new Schema({
    name: {
        type: String,
        required: 'Укажите название группы'
    },
    description: {
        type: String
    },
    users: [{
        ref: 'users',
        type: Schema.Types.ObjectId
    }],
    records: [{
        ref: 'groups',
        type: Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('Group', groupScheme)
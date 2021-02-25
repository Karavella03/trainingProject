const mongoose = require("mongoose")
const Schema = mongoose.Schema

/* 
Модель группы, группа состоиз из
названия, описания, списка подписчиков, списка участников,
списка записей опубликованных в этой группе
*/
const groupScheme = new Schema({
    name: {
        type: String,
        required: 'Укажите название группы'
    },
    description: {
        type: String
    },
    subscribers: [{
        ref: 'users',
        type: Schema.Types.ObjectId
    }],
    members: [{
        ref: 'users',
        type: Schema.Types.ObjectId
    }],
    records: [{
        ref: 'groups',
        type: Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('Group', groupScheme)
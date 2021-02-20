const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
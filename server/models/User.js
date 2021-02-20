const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userScheme = new Schema({
    logn: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
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
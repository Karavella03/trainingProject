const mongoose = require("mongoose")
const Schema = mongoose.Schema

/*
Модель записи, запись состоит из описания, 
списка авторов,
группы, в которую запись была опубоикована 
*/
const recordScheme = new Schema({
    description: {
        type: String
    },
    users: [{
        ref: 'users',
        type: Schema.Types.ObjectId
    }],
    group: {
        ref: 'groups',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Record', recordScheme)
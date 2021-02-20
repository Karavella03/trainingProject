const experess = require('express')
const router = experess.Router()
const User = require('../models/User')
const Group = require('../models/Group')
const Record = require('../models/Record')
const errorHandler = require('../utils/errorHandler')

router.post('/api/register', async (req, res) => {

})


module.exports = router
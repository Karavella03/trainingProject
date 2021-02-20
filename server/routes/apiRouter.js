const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const registerRouter = require('./registerRouter')

const jsonParser = express.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use('/api', urlencodedParser, registerRouter)

module.exports = router
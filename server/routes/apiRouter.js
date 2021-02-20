const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const registerRouter = require('./registerRouter')
const loginRouter = require('./loginRouter')

const jsonParser = express.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use('/api', urlencodedParser, registerRouter)
router.use('/api', urlencodedParser, loginRouter)

module.exports = router
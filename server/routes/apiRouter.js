const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const registerRouter = require('./registerRouter')
const loginRouter = require('./loginRouter')
const authorization = require('../middleWares/authorization')
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')

const jsonParser = express.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use('/api', urlencodedParser)
router.use('/api', jsonParser)

router.use('/api', registerRouter)
router.use('/api', loginRouter)
router.use('/api', authorization, userRouter)
router.use('/api', authorization, groupRouter)
router.get('/api/test', authorization, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router
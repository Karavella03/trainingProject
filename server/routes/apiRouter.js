const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const registerRouter = require('./api/registerRouter')
const loginRouter = require('./api/loginRouter')
const authorization = require('../middleWares/authorization')
const userRouter = require('./api/userRouter')
const groupRouter = require('./api/groupRouter')

const jsonParser = express.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use('/api', urlencodedParser)
router.use('/api', jsonParser)

/*
Обработка запросов, начинающикся с /api/*
*/
router.use('/api', registerRouter)
router.use('/api', loginRouter)
router.use('/api', authorization, userRouter)
router.use('/api', authorization, groupRouter)
router.get('/api/test', authorization, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router
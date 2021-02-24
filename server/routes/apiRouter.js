const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const registerRouter = require('./api/registerRouter')
const loginRouter = require('./api/loginRouter')
const authorization = require('../middleWares/authorization')
const userRouter = require('./api/userRouter')
const groupRouter = require('./api/groupRouter')
const logoutRouter = require('./api/logoutRouter')

const jsonParser = express.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

router.use('/api', jsonParser)
router.use('/api', urlencodedParser)

/*
Обработка запросов, начинающикся с /api/*
*/
router.use('/api', registerRouter)
router.use('/api', loginRouter)
router.use('/api', authorization, userRouter)
router.use('/api', authorization, groupRouter)
router.use('/api', authorization, logoutRouter)
router.get('/api/secret', authorization, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router
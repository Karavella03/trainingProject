const express = require('express')
const router = express.Router()

router.post('/logout', async (req, res) => {
    req.user.authNumber = ''
    await req.user.save()
    res.status(200)
})

module.exports = router
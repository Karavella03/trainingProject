const express = require('express')
const router = express.Router()

router.post('/logout', async (req, res) => {
    req.user.authNumber = ''
    console.log(req.user)
    await req.user.save()
    res.status(200).json({ message: 'ok' })
})

module.exports = router
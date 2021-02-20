const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require("body-parser")

const urlencodedParser = bodyParser.urlencoded({extended: false})
const jsonParser = express.json()

app.use(require('cors')())
app.use(express.static('src'))
app.use(express.json)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('500')
})

app.use((req, res) => {
    res.status(404).send('404')
})

module.exports = app
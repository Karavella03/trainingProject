const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const config = require('./config/config')
const errorHandler = require('./utils/errorHandler')
const registerRouter = require('./routes/registerRouter')

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const urlencodedParser = bodyParser.urlencoded({extended: false})
const jsonParser = express.json()

app.use(require('cors')())
app.use(express.static('src'))
app.use(jsonParser, registerRouter)

app.use((err, req, res, next) => {
    errorHandler(err, res, 500)
})

app.use((req, res) => {
    errorHandler(new Error('404 Page not found!'), res, 404)
})

module.exports = app
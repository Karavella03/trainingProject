const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/config')
const errorHandler = require('./utils/errorHandler')
const apiRouter = require('./routes/apiRouter')
const clientRouter = require('./routes/clientRouter')

//Подключение к базе данных
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.use(require('cors')())
app.use(express.static('src'))

//Подключение шаблонизатора
app.set('view engine', 'hbs')
app.set('views', './client/views')


app.use(apiRouter)
app.use(clientRouter)

app.use((err, req, res, next) => {
    errorHandler(err, res, 500)
})

app.use((req, res) => {
    errorHandler(new Error('404 Page not found!'), res, 404)
})

module.exports = app
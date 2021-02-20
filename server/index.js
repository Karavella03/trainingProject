const http = require('http')
const app = require('./app')
const config = require('./config/config')

http.Server(app).listen(config.PORT, () => {
    console.log(`Server has been started on port ${config.PORT}`)
})


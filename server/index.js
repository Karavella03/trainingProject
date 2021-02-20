const app = require('./app')
const http = require('http').Server(app)
const config = require('./config/config')

http.listen(config.PORT, () => {
    console.log(`Server has been started on port: ${config.PORT}`)
})


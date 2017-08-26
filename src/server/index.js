import http from 'http'
import apiServer from './server'

const httpServer = http.createServer(apiServer)
let io = require('socket.io')(httpServer)

let currentApp = apiServer

io.on('connection', (socket) => {
    console.log(socket.id + ' connected')
})

httpServer.listen(3000)

if(module.hot){
    module.hot.accept('./server', () => {
        httpServer.removeListener('request', currentApp)
        httpServer.on('request', apiServer)
        currentApp = apiServer
    })
}
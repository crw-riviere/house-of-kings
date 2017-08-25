import http from 'http'
import apiServer from './server'

const server = http.createServer(apiServer)
let currentApp = apiServer
server.listen(3000)

if(module.hot){
    module.hot.accept('./server', () => {
        server.removeListener('request', currentApp)
        server.on('request', apiServer)
        currentApp = apiServer
    })
}
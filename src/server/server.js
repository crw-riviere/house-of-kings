const path = require('path')
const express = require('express')
var server = express()
var http = require('http').Server(server);

const PublicPath = '.dist'

var io = require('socket.io')(http, {
    origins: ['*']
}); 

server.use(express.static('.dist'));

server.get('/', (req, res) => {
    res.sendFile(path.join(PublicPath, 'index.html'))
})

server.get('/api', (req, res) => {
    res.send({
        message: `__dirname: ${__dirname}`
    })
})

export default server
var apiServer = require('express')();
var http = require('http').Server(apiServer);
var io = require('socket.io')(http, {
    origins: ['*']
}); 

apiServer.get('/api', (req, res) => {
    res.send({
        message: 'I am the api server!!'
    })
})


export default apiServer
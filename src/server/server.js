const path = require('path');
const express = require('express');

const server = express();
const http = require('http').Server(server);

const PublicPath = '.dist';

const io = require('socket.io')(http, {
  origins: ['*'],
});

server.use(express.static('.dist'));

server.get('/', (req, res) => {
  res.sendFile(path.join(PublicPath, 'index.html'));
});

server.get('/api', (req, res) => {
  res.send({
    message: `dirname: ${__dirname}`,
  });
});

export default server;

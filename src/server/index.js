import http from 'http'
import apiServer from './server'
import Game from '../models/game'
import Deck from '../models/deck'

const httpServer = http.createServer(apiServer)
let io = require('socket.io')(httpServer)

let currentApp = apiServer

let games = new Map()

io.on('connection', (socket) => {
    console.log(socket.id + ' connected')
    io.emit('userConnected',{id:socket.id});

    const gameName = 'g1'
    const game = new Game(gameName, Deck.full())
    socket.game = {name:gameName}
    games.set(gameName, game);
    socket.join(gameName)
    io.to(gameName).emit('userJoinedGame', 
    {userId:socket.id, gameName, currentUserTurn:game.currentUserTurn})

    socket.on('pickCard', () => {
        const pickedCard = game.pickCard();
        console.log(`${socket.id} picked ${pickedCard.number + pickedCard.suit}`)

        io.to(gameName).emit('userPickedCard', 
        {userId:socket.id, card:pickedCard})
    })

    socket.on('disconnect', (reason) => {
        console.log(socket.id + ' disconnected')
        io.emit('userDisconnected',{id:socket.id});
    })
})

httpServer.listen(3000)

if(module.hot){
    module.hot.accept('./server', () => {
        httpServer.removeListener('request', currentApp)
        httpServer.on('request', apiServer)
        currentApp = apiServer
    })
}
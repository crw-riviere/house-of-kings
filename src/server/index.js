import http from 'http'
import apiServer from './server'
import Deck from '../models/deck'
import Game from '../models/game'
import GameList from '../models/gameList'

const httpServer = http.createServer(apiServer)
let io = require('socket.io')(httpServer)

let currentApp = apiServer

const defaultGameName = 'Default Game'
const gameList = new GameList()

io.on('connection', (socket) => {
    console.log(socket.id + ' connected')
    io.emit('userConnected', {
        id: socket.id
    });

    socket.on('joinGame', (gameId) => {
        const game = gameList.getGame(defaultGameName)
        socket.gameId = game.id
        game.addUser(socket.id)
        socket.join(defaultGameName)
        io.to(defaultGameName).emit('userJoinedGame', {
            userId: socket.id,
            gameId: game.id,
            currentUserTurn: game.currentUserTurn
        })
    })

    socket.on('pickCard', () => {
        const game = gameList.getGame(socket.gameId)
        const pickedCard = game.userPickCard(socket.id);

        if (pickedCard) {
            console.log(`${socket.id} picked ${pickedCard.number + pickedCard.suit}`)

            io.to(game.id).emit('userPickedCard', {
                userId: socket.id,
                card: pickedCard
            })
        }
    })

    socket.on('disconnect', (reason) => {
        console.log(socket.id + ' disconnected')
        io.emit('userDisconnected', {
            id: socket.id
        });
    })
})

httpServer.listen(3000)

if (module.hot) {
    module.hot.accept('./server', () => {
        httpServer.removeListener('request', currentApp)
        httpServer.on('request', apiServer)
        currentApp = apiServer
    })
}
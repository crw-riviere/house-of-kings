import http from 'http'
import apiServer from './server'
import User from '../models/user'
import Deck from '../models/deck'
import Game from '../models/game'
import GameList from '../models/gameList'
import {
    rules
} from '../models/rules.js'

const httpServer = http.createServer(apiServer)
let io = require('socket.io')(httpServer)

let currentApp = apiServer

const defaultGameName = 'Default Game'
const gameList = new GameList()

io.on('connection', (socket) => {
    console.log(socket.id + ' connected')

    socket.on('usernameSelected', (username) => {
        if(!username){
            return
        }

        socket.user = new User(username)
        io.emit('userConnected', {
            id: username
        });
    })

    socket.on('joinGame', (gameId) => {
        const game = gameList.getGame(defaultGameName)
        socket.gameId = game.id
        game.addUser(socket.user)
        socket.join(defaultGameName)
        io.to(defaultGameName).emit('userJoinedGame', {
            joinedUser: socket.user,
            gameId: game.id,
            currentUserTurn: game.currentUserTurn,
            users: game.users,
            cardCount: game.cardCount,
            kingCount: game.kingCount
        })
    })

    socket.on('pickCard', () => {
        console.log(`${socket.id} picked up card`)
        const game = gameList.getGame(socket.gameId)
        const pickedCard = game.userPickCard(socket.user.id);

        if (pickedCard) {
            console.log(`${socket.id} picked ${pickedCard.number + pickedCard.suit}`)
            const nextUserTurn = game.nextUserTurn()
            const rule = rules.get(pickedCard.number)

            io.to(game.id).emit('userPickedCard', {
                user: socket.user,
                users: game.users,
                card: pickedCard,
                nextUserTurn,
                rule,
                cardCount: game.cardCount,
                kingCount: game.kingCount
            })
        }
    })

    socket.on('reshuffle', () => {
        console.log(socket.gameId + ' reshuffled')
        const game = gameList.getGame(socket.gameId)
        game.reshuffle()
        io.to(game.id).emit('reshuffled', {
          cardCount: game.cardCount,
          kingCount: game.kingCount  
        })
    })

    socket.on('disconnect', (reason) => {
        console.log(socket.id + ' disconnected')
        const game = gameList.getGame(socket.gameId)
        game.removeUser(socket.user.id)
        io.emit('userDisconnected', {
            userId: socket.user.id,
            users: game.users
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
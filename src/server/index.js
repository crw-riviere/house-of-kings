import http from 'http';
import server from './server';
import User from '../models/user';
import GameList from '../models/gameList';
import Rules from '../models/rules';

const httpServer = http.createServer(server);
const io = require('socket.io')(httpServer);

let currentApp = server;

const defaultGameName = 'Default Game';
const gameList = new GameList();

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('usernameSelected', (username) => {
    if (username) {
      socket.username = username;
      socket.user = new User(username);
      console.log(`${socket.id} created user`);
      io.emit('userConnected', {
        id: username,
      });
    }
  });

  socket.on('joinGame', () => {
    const game = gameList.getGame(defaultGameName);
    socket.gameId = game.id;
    game.addUser(socket.user);
    socket.join(defaultGameName);
    io.to(defaultGameName).emit('userJoinedGame', {
      joinedUser: socket.user,
      gameId: game.id,
      currentUserTurn: game.currentUserTurn,
      users: game.users,
      cardCount: game.cardCount,
      kingCount: game.kingCount,
    });
  });

  socket.on('pickCard', () => {
    console.log(`${socket.id} picked up card`);
    const game = gameList.getGame(socket.gameId);
    const pickedCard = game.userPickCard(socket.username);
    if (pickedCard) {
      console.log(`${socket.id} picked ${pickedCard.number} ${pickedCard.suit}, ${game.cardCount} remaining card(s)`);
      const nextUserTurn = game.nextUserTurn();
      console.log(`${nextUserTurn.id} has current turn`);
      const rule = Rules.get(pickedCard.number);

      io.to(game.id).emit('userPickedCard', {
        user: socket.user,
        users: game.users,
        card: pickedCard,
        nextUserTurn,
        rule,
        cardCount: game.cardCount,
        kingCount: game.kingCount,
      });
    }
  });

  socket.on('reshuffle', () => {
    console.log(`${socket.gameId} reshuffled`);
    const game = gameList.getGame(socket.gameId);
    game.reshuffle();
    io.to(game.id).emit('reshuffled', {
      cardCount: game.cardCount,
      kingCount: game.kingCount,
      currentUserTurn: game.currentUserTurn,
    });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    const game = gameList.getGame(socket.gameId);
    game.removeUser(socket.username);
    io.emit('userDisconnected', {
      userId: socket.username,
      users: game.users,
      currentUserTurn: game.currentUserTurn,
    });
  });
});

httpServer.listen(3000);

if (module.hot) {
  module.hot.accept('./server', () => {
    httpServer.removeListener('request', currentApp);
    httpServer.on('request', server);
    currentApp = server;
  });
}

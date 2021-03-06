import Game from './game';

export default class GameList {
  constructor(games) {
    this.games = games || [];
  }

  getGame(gameId) {
    let game = this.games.find(x => x.id === gameId);
    if (!game) {
      game = new Game(gameId);
      this.games.push(game);
    }

    return game;
  }
}

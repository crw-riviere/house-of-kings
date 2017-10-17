import Game from '../../src/models/game'
import GameList from '../../src/models/gameList'

test('get a game should return the game from the game list', () => {
    const gameName = 'test'
    const gameList = new GameList([{id:gameName}])

    const game = gameList.getGame(gameName)
    expect(game.id).toBe(gameName)
})

test('get a game should add the game to the game list if not found', () => {
    const gameName = 'test'
    const gameList = new GameList()

    const game = gameList.getGame(gameName)
    expect(game.id).toBe(gameName)
})
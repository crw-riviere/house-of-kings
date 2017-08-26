import Game from '../src/models/game'

test('game returns a full set of cards', () => {
    const game = new Game(1)
    expect(game.generateCards()).toBeTruthy()
})
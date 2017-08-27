import Game from '../src/models/game'
import Deck from '../src/models/deck'

test('pick card removes a card from the deck', () => {
    const game = new Game(1, null, [1])
    expect(game.cards.length).toBe(52)
    
    game.userPickCard(1)
    expect(game.cards.length).toBe(51)
})

test('add user adds a user to the game', () => {
    const game = new Game(1)
    expect(game.users.length).toBe(0)
    
    game.addUser('Fliss')
    expect(game.users.length).toBe(1)
    expect(game.users).toContain('Fliss')
})

test('current user turn returns the current user turn', () => {
    const game = new Game(1,Deck.full(), ['Fliss', 'Coco'])
    expect(game.currentUserTurn).toBe('Fliss')
})

test('get next user turn iterates over users', () => {
    const game = new Game(1,Deck.Full,['Fliss', 'Coco', 'Jacques'])
    expect(game.currentUserTurn).toBe('Fliss')

    const firstNextUser = game.nextUserTurn
    expect(firstNextUser).toBe('Coco')

    const secondNextUser = game.nextUserTurn
    expect(secondNextUser).toBe('Jacques')

    const thirdNextUser = game.nextUserTurn
    expect(thirdNextUser).toBe('Fliss')
})
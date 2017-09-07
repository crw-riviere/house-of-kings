import Game from '../src/models/game'
import Deck from '../src/models/deck'

test('pick card removes a card from the deck', () => {
    const game = new Game(1, null, [1])
    expect(game.cardCount).toBe(52)
    
    game.userPickCard(1)
    expect(game.cardCount).toBe(51)
})

test('add user adds a user to the game', () => {
    const game = new Game(1)
    expect(game.userCount).toBe(0)
    
    game.addUser('Fliss')
    expect(game.userCount).toBe(1)
    expect(game.users).toContain('Fliss')
})

test('current user turn returns the current user turn', () => {
    const game = new Game(1,Deck.full(), ['Fliss', 'Coco'])
    expect(game.currentUserTurn).toBe('Fliss')
})

test('get next user turn iterates over users', () => {
    const game = new Game(1,Deck.Full,['Fliss', 'Coco', 'Jacques'])
    expect(game.currentUserTurn).toBe('Fliss')

    const firstNextUser = game.nextUserTurn()
    expect(firstNextUser).toBe('Coco')

    const secondNextUser = game.nextUserTurn()
    expect(secondNextUser).toBe('Jacques')

    const thirdNextUser = game.nextUserTurn()
    expect(thirdNextUser).toBe('Fliss')
})

test('remove user removes the user from the user list', () => {
    const game = new Game(1,Deck.full(), ['Fliss', 'Coco'])
    expect(game.users).toEqual(['Fliss', 'Coco'])

    game.removeUser('Coco')
    expect(game.users).toEqual(['Fliss'])
})

test('king count should return how many kings are left in the deck', () => {
    const game = new Game(1,[{suit:'',number:'K'},{suit:'',number:'K'},], [1])
    expect(game.kingCount).toEqual(2)

    game.userPickCard(1)
    expect(game.kingCount).toBe(1)
})

test('reshuffle should populate the deck', () => {
    const game = new Game(1,[{suit:'',number:'K'}], [1])
    expect(game.cardCount).toEqual(1)

    game.reshuffle()
    expect(game.cardCount).toBe(52)
})
import Game from '../src/models/game'
import Deck from '../src/models/deck'
import User from '../src/models/user'

test('pick card removes a card from the deck', () => {
    const game = new Game(1, null, [new User(1)])
    expect(game.cardCount).toBe(52)
    
    game.userPickCard(1)
    expect(game.cardCount).toBe(51)
})

test('add user adds a user to the game', () => {
    const game = new Game(1)
    expect(game.userCount).toBe(0)
    
    const user1 = new User(1)
    game.addUser(user1)
    expect(game.userCount).toBe(1)
    expect(game.users).toContain(user1)
})

test('current user turn returns the current user turn', () => {
    const user1 = new User(1)
    const user2 = new User(2)
    
    const game = new Game(1,Deck.full(), [user1, user2])
    expect(game.currentUserTurn).toBe(user1)
})

test('get next user turn iterates over users', () => {
    const user1 = new User(1)
    const user2 = new User(2)
    const user3 = new User(3)
    
    const game = new Game(1,Deck.Full,[user1, user2, user3])
    expect(game.currentUserTurn).toBe(user1)

    const firstNextUser = game.nextUserTurn()
    expect(firstNextUser).toBe(user2)

    const secondNextUser = game.nextUserTurn()
    expect(secondNextUser).toBe(user3)

    const thirdNextUser = game.nextUserTurn()
    expect(thirdNextUser).toBe(user1)
})

test('remove user removes the user from the user list', () => {
    const user1 = new User(1)
    const user2 = new User(2)
    
    const game = new Game(1,Deck.full(), [user1, user2])
    expect(game.users).toEqual([user1, user2])

    game.removeUser(2)
    expect(game.users).toEqual([user1])
})

test('king count should return how many kings are left in the deck', () => {
    const user1 = new User(1)
    
    const game = new Game(1,[{suit:'',number:'K'},{suit:'',number:'K'},], [user1])
    expect(game.kingCount).toEqual(2)

    game.userPickCard(1)
    expect(game.kingCount).toBe(1)
})

test('reshuffle should populate the deck', () => {
    const game = new Game(1,[{suit:'',number:'K'}])
    expect(game.cardCount).toEqual(1)

    game.reshuffle()
    expect(game.cardCount).toBe(52)
})
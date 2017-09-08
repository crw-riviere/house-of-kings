import Deck from './deck'

export default class Game {
    constructor(id, cards, users) {
        this.id = id
        this.cards = cards || Deck.fullShuffled()
        this.users = users || []
    }

    get cardCount() {
        return this.cards.length
    }

    get kingCount(){
        return this.cards.filter(x => x.number === 'K').length
    }

    get userCount() {
        return this.users.length
    }

    get currentUserTurn() {
        return this.users[0]
    }

    nextUserTurn() {
        this.users.push(this.users.shift())
        return this.currentUserTurn
    }

    addUser(user) {
        this.users.push(user)
    }

    userPickCard(userId) {
        if (this.currentUserTurn.id === userId) {
            const card = this.cards.pop()
            if(card.number === 'K'){
                this.currentUserTurn.kingCount++
            }
            return card
        }
    }

    removeUser(userId){
        const newUserList = this.users.filter(x => x.id !== userId)
        this.users = newUserList
    }

    reshuffle(){
        this.cards = Deck.fullShuffled()
    }
}
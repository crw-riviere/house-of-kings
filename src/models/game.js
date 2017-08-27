export default class Game {
    constructor(id, cards, users) {
        this.id = id
        this.cards = cards
        this.users = users || []
    }

    get cardCount(){
        return this.cards.length
    }

    get userCount(){
        return this.users.length
    }

    get currentUserTurn(){
        return this.users[0]
    }

    get nextUserTurn(){
        this.users.push(this.users.shift())
        return this.currentUserTurn
    }

    addUser(userId){
        this.users.push(userId)
    }

    pickCard(){
        return this.cards.pop()
    }
}
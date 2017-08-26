export default class Game {
    constructor(id) {
        this.id = id
        this.cards = this.generateCards();
    }
    
    generateCards() {
        return [{
            suit: '♦',
            number: 'A'
        }, {
            suit: '♣',
            number: 'A'
        }, {
            suit: '♥',
            number: 'A'
        }, {
            suit: '♠',
            number: 'A'
        }, ];
    }
}
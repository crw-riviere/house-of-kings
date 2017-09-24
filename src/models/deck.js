/* eslint no-param-reassign: "off" */
/* eslint no-var: "off" */
/* eslint one-var: "off" */
/* eslint one-var-declaration-per-line: "off" */

const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♦', '♣️', '♥', '♠'];

export default class Deck {
  static full() {
    return suits.map(s => numbers.map(n => ({
      number: n,
      suit: s,
    }))).reduce((a, b) => a.concat(b));
  }

  static fullShuffled() {
    return this.shuffleDeck(this.full());
  }

  static shuffleDeck(deck) {
    var currentIndex = deck.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }

    return deck;
  }

  static getCardColor(suit) {
    return (suit === '♦' || suit === '♥') ? 'red' : 'black';
  }
}

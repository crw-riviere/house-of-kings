import Deck from '../../src/models/deck'

test('deck returns a full set of cards', () => {
    const cards = Deck.full();
    expect(cards).toHaveLength(52);
})
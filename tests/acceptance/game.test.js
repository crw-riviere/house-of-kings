import TestClient from '../helper/testClient';

describe('When playing a game', () => {
  // test('picking a card returns a new card', async () => {
  //   const app = new TestClient();
  //   app
  //     .createUser()
  //     .pickCard();

  //   const text = await app.nightmare.evaluate(() => document.querySelector('blockquote').innerText).end();

  //   expect(text).toContain('Coco picked');
  // });

  test('picking 52 cards results in game over', async () => {
    const app = new TestClient();
    app.createUser();

    for (let i = 0; i < 52; i++) {
      app.pickCard();
      app.nightmare.wait(1000)
    }

    const text = await app.nightmare.evaluate(() => document.querySelector('a.button').innerText).end();

    expect(text).toContain('Play Again');
  });
});
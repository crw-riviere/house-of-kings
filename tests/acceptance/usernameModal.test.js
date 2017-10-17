import TestClient from '../helper/testClient';

describe('When visiting the username modal', () => {
  test('it prompts for a username', async () => {
    const page = new TestClient();
    const text = await page.nightmare.evaluate(() => document.querySelector('input[type=text]').placeholder).end();

    expect(text).toContain('please enter your username...');
  });

  test('it accepts a username via keyboard return', async () => {
    const page = new TestClient();
    page.createUser();

    const text = await page.nightmare.evaluate(() => document.querySelector('.box').innerText).end();

    expect(text).toContain('Pick a card to begin...');
  });

  test('it accepts a username via submit', async () => {
    const page = new TestClient();
    page.nightmare
      .type('input[type=text]', 'Coco')
      .click('button[type=submit]');

    const text = await page.nightmare.evaluate(() => document.querySelector('.box').innerText).end();

    expect(text).toContain('Pick a card to begin...');
  });
});

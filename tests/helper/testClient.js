import nightmare from 'nightmare';

export default class TestClient {
  constructor() {
    this.nightmare = nightmare({
      show: true,
    }).goto('http://localhost:3000');

    return this;
  }

  createUser(username) {
    const name = username || 'Coco';
    this.nightmare.type('input[type=text]', `${name}\u000d`);
    return this;
  }

  pickCard() {
    this.nightmare.click('a.button.is-large.is-fullwidth');
    return this;
  }
}

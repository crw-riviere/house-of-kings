import React from 'react';
import openSocket from 'socket.io-client';
import 'bulma/css/bulma.css';
import '../app.css';
import UserList from './UserList';
import Card from './Card';
import CardButton from './CardButton';
import Audit from './Audit';
import CountPanel from './CountPanel';
import UsernameModal from './UsernameModal';
import GameOverModal from './GameOverModal';
import Deck from '../../models/deck';
import '../../../public/favicon.ico';

const socket = openSocket('http://localhost:3000');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      isTurn: false,
      isGameOver: false,
      users: [],
      audit: [],
      card: { suit: '🔥', number: '🔥' },
      rule: { title: 'House of Kings', description: 'Pick a card to begin...' },
      cardCount: 52,
      kingCount: 4,
    };

    this.handleUsernameSelected = this.handleUsernameSelected.bind(this);

    socket.on('userConnected', (user) => {
    });

    socket.on('userJoinedGame', (gameInfo) => {
      const myTurn = gameInfo.currentUserTurn.id === this.state.username;
      const audit = this.state.audit;
      audit.push(
        `${gameInfo.joinedUser.id} joined the game`,
        `${gameInfo.currentUserTurn.id} has current turn`);
      this.setState({
        isTurn: myTurn,
        users: gameInfo.users,
        audit,
        cardCount: gameInfo.cardCount,
        kingCount: gameInfo.kingCount,
      });
    });

    socket.on('userPickedCard', pickInfo => {
      const myTurn = pickInfo.nextUserTurn.id === this.state.username;
      const cardCount = pickInfo.cardCount;
      const audit = this.state.audit;
      audit.push(
        <span>{pickInfo.user.id} picked <span className={Deck.getCardColor(pickInfo.card.suit) + '-card'}>{pickInfo.card.number} {pickInfo.card.suit}</span></span>,
        <span>{pickInfo.nextUserTurn.id} has current turn</span>);
      this.setState({
        users: pickInfo.users,
        isTurn: myTurn,
        card: pickInfo.card,
        audit,
        rule: pickInfo.rule,
        cardCount: cardCount,
        kingCount: pickInfo.kingCount,
        isGameOver: cardCount === 0,
      });
    });

    socket.on('reshuffled', gameInfo => {
      const myTurn = gameInfo.currentUserTurn.id === this.state.username;
      const audit = this.state.audit;
      audit.push('Game was reshuffled');
      this.setState({
        audit,
        isGameOver: false,
        cardCount: gameInfo.cardCount,
        kingCount: gameInfo.kingCount,
        isTurn:myTurn,
      });
    });

    socket.on('userDisconnected', (userInfo) => {
      this.handleUserDisconnect(userInfo);
    });
  }

  handleUsernameSelected(usernameSelected) {
    if (!usernameSelected) {
      return;
    }

    this.setState({
      username: usernameSelected,
    });
    socket.emit('usernameSelected', usernameSelected);
    socket.emit('joinGame');
  }

  handleUserConnect(user) {

  }

  handlePickCard() {
    socket.emit('pickCard');
  }

  handleReshuffle() {
    socket.emit('reshuffle');
  }

  handleUserDisconnect(gameInfo) {
    const myTurn = gameInfo.currentUserTurn.id === this.state.username;
    const audit = this.state.audit;
    audit.push(`${gameInfo.userId} left the game`);
    this.setState({
      audit,
      users: gameInfo.users,
      isTurn:myTurn,
    });
  }

  componentDidMount() {
  }

  render() {
    const users = this.state.users;
    const myTurn = this.state.isTurn;
    const usernameModal = <UsernameModal onSubmit={this.handleUsernameSelected} />;
    const actionButton = this.state.isGameOver ?
      <GameOverModal onClick={() => this.handleReshuffle()} /> :
      <CardButton isTurn={myTurn} onClick={() => this.handlePickCard()} />;

    const app = !this.state.username ? usernameModal :
      (<div>
        <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item">
                            House of Kings <span role="img" aria-label="king's crown">👑</span>
            </a>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <Audit items={this.state.audit} />
            <Card
              number={this.state.card.number}
              suit={this.state.card.suit}
              rule={this.state.rule}
            />
            <UserList users={users} />
            <br />
            <CountPanel cardCount={this.state.cardCount} kingCount={this.state.kingCount} />
            {actionButton}
          </div>
        </section>
      </div>);

    return (
      app
    );
  }
}

export default App;

import React from 'react';
import UserList from './UserList';
import Card from './Card';
import CardButton from './CardButton';
import Audit from './Audit';
import CountPanel from './CountPanel';
import GameOverModal from './GameOverModal';
import Deck from '../../models/deck';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.socket = this.props.socket;
    const username = this.props.username;

    this.state = {
      username,
      isTurn: false,
      isGameOver: false,
      users: [],
      audit: [],
      card: { suit: '🔥', number: '🔥' },
      rule: { title: 'House of Kings', description: 'Pick a card to begin...' },
      cardCount: 52,
      kingCount: 4,
    };

    this.socket.on('userJoinedGame', (gameInfo) => {
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

    this.socket.on('userPickedCard', (pickInfo) => {
      const myTurn = pickInfo.nextUserTurn.id === this.state.username;
      const cardCount = pickInfo.cardCount;
      const audit = this.state.audit;
      audit.push(
        <span>{pickInfo.user.id} picked <span className={`${Deck.getCardColor(pickInfo.card.suit)}-card`}>{pickInfo.card.number} <span className="has-text-weight-bold">{pickInfo.card.suit}</span></span></span>,
        <span>{pickInfo.nextUserTurn.id} has current turn</span>);
      this.setState({
        users: pickInfo.users,
        isTurn: myTurn,
        card: pickInfo.card,
        audit,
        rule: pickInfo.rule,
        cardCount,
        kingCount: pickInfo.kingCount,
        isGameOver: cardCount === 0,
      });
    });

    this.socket.on('reshuffled', (gameInfo) => {
      const myTurn = gameInfo.currentUserTurn.id === this.state.username;
      const audit = this.state.audit;
      audit.push('Game was reshuffled');
      this.setState({
        audit,
        isGameOver: false,
        cardCount: gameInfo.cardCount,
        kingCount: gameInfo.kingCount,
        isTurn: myTurn,
      });
    });

    this.socket.on('userDisconnected', (userInfo) => {
      this.handleUserDisconnect(userInfo);
    });
  }

  handlePickCard() {
    this.socket.emit('pickCard');
  }

  handleReshuffle() {
    this.socket.emit('reshuffle');
  }

  handleUserDisconnect(gameInfo) {
    const myTurn = gameInfo.currentUserTurn.id === this.state.username;
    const audit = this.state.audit;
    audit.push(`${gameInfo.userId} left the game`);
    this.setState({
      audit,
      users: gameInfo.users,
      isTurn: myTurn,
    });
  }

  render() {
    const users = this.state.users;
    const myTurn = this.state.isTurn;

    const actionButton = this.state.isGameOver ?
      <GameOverModal onClick={() => this.handleReshuffle()} /> :
      <CardButton isTurn={myTurn} onClick={() => this.handlePickCard()} />;

    return (
      <div className="main-wrapper">
        <section className="section full-height">
          <div className="container main-container">
            <Audit items={this.state.audit} />
            <Card
              number={this.state.card.number}
              suit={this.state.card.suit}
              rule={this.state.rule}
            />
            <UserList users={users} />
            <CountPanel cardCount={this.state.cardCount} kingCount={this.state.kingCount} />
            {actionButton}
          </div>
        </section>
      </div>
    );
  }
}


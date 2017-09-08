import React from 'react'
import openSocket from 'socket.io-client'
import 'bulma/css/bulma.css'
import '../App.css'
import UserList from './UserList.jsx'
import Card from './Card.jsx'
import CardButton from './CardButton.jsx'
import Audit from './Audit.jsx'
import CountPanel from './CountPanel.jsx'
import UsernameModal from './UsernameModal.jsx'
import GameOverModal from './GameOverModal.jsx'
import Deck from '../../models/deck.js'

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
            card: { suit: 'X', number: 'X' },
            rule: { title: '', description: '' },
            cardCount: 52,
            kingCount: 4
        }

        this.handleUsernameSelected = this.handleUsernameSelected.bind(this)

        socket.on('userConnected', (user) => {
            console.log(`${user.id} joined`)
        })

        socket.on('userJoinedGame', (gameInfo) => {
            const myTurn = gameInfo.currentUserTurn.id === this.state.username
            let audit = this.state.audit
            audit.push(
                <span>{gameInfo.joinedUser.id} joined {gameInfo.gameId}</span>,
                <span>{gameInfo.currentUserTurn.id} has current turn</span>)
            this.setState({
                isTurn: myTurn,
                users: gameInfo.users,
                audit,
                cardCount: gameInfo.cardCount,
                kingCount: gameInfo.kingCount
            })
        })

        socket.on('userPickedCard', pickInfo => {
            const myTurn = pickInfo.nextUserTurn.id === this.state.username
            const cardCount = pickInfo.cardCount
            let audit = this.state.audit
            audit.push(
                <span>{pickInfo.user.id} picked <span className={Deck.getCardColor(pickInfo.card.suit) + '-card'}>{pickInfo.card.number + pickInfo.card.suit}</span></span>,
                <span>{pickInfo.nextUserTurn.id} has current turn</span>)
            this.setState({
                users: pickInfo.users,
                isTurn: myTurn,
                card: pickInfo.card,
                audit,
                rule: pickInfo.rule,
                cardCount: cardCount,
                kingCount: pickInfo.kingCount,
                isGameOver: cardCount === 0
            })
        })

        socket.on('reshuffled', gameInfo => {
            this.setState({
                isGameOver: false,
                cardCount: gameInfo.cardCount,
                kingCount: gameInfo.kingCount
            })
        })

        socket.on('userDisconnected', (userInfo) => {
            this.handleUserDisconnect(userInfo);
        })
    }

    handleUsernameSelected(usernameSelected) {
        if (!usernameSelected) {
            return
        }

        this.setState({
            username: usernameSelected
        })
        socket.emit('usernameSelected', usernameSelected)
        socket.emit('joinGame')
    }

    handleUserConnect(user) {

    }

    handlePickCard() {
        socket.emit('pickCard')
    }

    handleReshuffle() {
        socket.emit('reshuffle')
    }

    handleUserDisconnect(userInfo) {
        this.setState({
            users: userInfo.users
        })
    }

    componentDidMount() {
    }

    render() {
        const users = this.state.users
        const myTurn = this.state.isTurn
        let usernameModal = <UsernameModal onSubmit={this.handleUsernameSelected} />
        let actionButton = this.state.isGameOver ?
            <GameOverModal onClick={() => this.handleReshuffle()} /> :
            <CardButton isTurn={myTurn} onClick={() => this.handlePickCard()} />

        let app = !this.state.username ? usernameModal :
            <div>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            House of Kings 👑
                        </a>
                    </div>
                </nav>
                <section className="section is-medium">
                    <div className="container">
                        <Audit items={this.state.audit} />
                        <Card number={this.state.card.number} suit={this.state.card.suit} rule={this.state.rule} />
                        <UserList users={users} />
                        <CountPanel cardCount={this.state.cardCount} kingCount={this.state.kingCount}/>
                        {actionButton}
                    </div>
                </section>
            </div>

        return (
            app
        )
    }
}

export default App



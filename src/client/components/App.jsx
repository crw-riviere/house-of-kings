import React from 'react'
import openSocket from 'socket.io-client'
import 'bulma/css/bulma.css'
import '../App.css'
import UserList from './UserList.jsx'
import Card from './Card.jsx'
import CardButton from './CardButton.jsx'
import Audit from './Audit.jsx'
import UsernameModal from './UsernameModal.jsx'
import Deck from '../../models/deck.js'

const socket = openSocket('http://localhost:3000');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:undefined,
            isTurn: false,
            users: [],
            audit: [],
            card: null,
            rule:null,
            cardCount:52,
            kingCount:4
        }

        this.handleUsernameSelected = this.handleUsernameSelected.bind(this)

        socket.on('userConnected', (user) => {
            console.log(`${user.id} joined`)
        })

        socket.on('userJoinedGame', (gameInfo) => {
            const myTurn = gameInfo.currentUserTurn === this.state.username
            let audit = this.state.audit
            audit.push(
                <span>{gameInfo.joinedUserId} joined {gameInfo.gameId}</span>, 
                <span>{gameInfo.currentUserTurn} has current turn</span>)
            this.setState({
                isTurn: myTurn,
                users: gameInfo.users,
                audit
            })
        })

        socket.on('userPickedCard', pickInfo => {
            const myTurn = pickInfo.userId === this.state.username 
            let audit = this.state.audit
            audit.push(
                <span>{pickInfo.userId} picked <span className={Deck.getCardColor(pickInfo.card.suit)+'-card'}>{pickInfo.card.number + pickInfo.card.suit}</span></span>, 
                <span>{pickInfo.nextUserTurn} has current turn</span>)
            this.setState({
                isTurn: myTurn,
                card: pickInfo.card,
                audit,
                rule: pickInfo.rule,
                cardCount:pickInfo.cardCount,
                kingCount:pickInfo.kingCount
            })
        })

        socket.on('userDisconnected', (userInfo) => {
            this.handleUserDisconnect(userInfo);
        })
    }

    handleUsernameSelected(usernameSelected){
        this.setState({
            username:usernameSelected
        })
        socket.emit('usernameSelected', usernameSelected)
        socket.emit('joinGame')
    }

    handleUserConnect(user) {

    }

    handlePickCard() {
        socket.emit('pickCard')
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

        let card = 'No card'
        if (this.state.card) {
            card = <Card number={this.state.card.number} suit={this.state.card.suit} rule={this.state.rule}/>
        }

        let app = !this.state.username ? 
        <UsernameModal onSubmit={this.handleUsernameSelected} /> :
<div>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            House of Kings
                        </a>
                    </div>
                </nav>
                <section className="section">
                    <Audit items={this.state.audit} />
                    <div className="container">
                        {card}
                        <UserList users={users} />
                        <nav className="level is-mobile">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Cards</p>
                                    <p className="title">{this.state.cardCount}</p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Kings</p>
                                    <p className="title">{this.state.kingCount}</p>
                                </div>
                            </div>
                        </nav>
                        <CardButton isTurn={myTurn} onHandlePickCard={() => this.handlePickCard()}/>
                    </div>
                </section>
                <footer className="footer">
                    <div className="container">
                        <div className="content has-text-centered">
                            <p>Made by Fliss and Coco</p>
                        </div>
                    </div>
                </footer>
            </div>
        
        return (
            app
        )
    }
}

export default App



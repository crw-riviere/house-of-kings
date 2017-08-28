import React from 'react'
import openSocket from 'socket.io-client'
import 'bulma/css/bulma.css'
import UserList from './UserList.jsx'
import Card from './Card.jsx'
import Narrator from './Narrator.jsx'

const socket = openSocket('http://localhost:3000');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            quote: 'Welcome',
            card: null,
            rule:null,
            cardCount:52,
            kingCount:4
        }

        socket.on('userConnected', (user) => {
        })

        socket.on('userJoinedGame', (gameInfo) => {
            this.setState({
                users: gameInfo.users,
                quote: `${gameInfo.joinedUserId} joined ${gameInfo.gameId}, ${gameInfo.currentUserTurn} has current turn`
            })
        })

        socket.on('userPickedCard', pickInfo => {
            this.setState({
                card: pickInfo.card,
                quote: `${pickInfo.userId} picked ${pickInfo.card.number + pickInfo.card.suit}, ${pickInfo.nextUserTurn} has turn`,
                rule: pickInfo.rule,
                cardCount:pickInfo.cardCount,
                kingCount:pickInfo.kingCount
            })
        })

        socket.on('userDisconnected', (userInfo) => {
            this.handleUserDisconnect(userInfo);
        })
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
        socket.emit('joinGame')
    }

    render() {
        const users = this.state.users
        let card = 'No card'
        if (this.state.card) {
            card = <Card number={this.state.card.number} suit={this.state.card.suit} rule={this.state.rule}/>
        }
        return (
            <div>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            House of Kings
                        </a>
                    </div>
                </nav>
                <section className="section">
                    <Narrator quote={this.state.quote} />
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
                        <a className="button is-large is-fullwidth"
                            onClick={() => this.handlePickCard()}>Pick Card</a>
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
        )
    }
}

export default App



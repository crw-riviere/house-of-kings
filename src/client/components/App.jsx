import React from 'react'
import openSocket from 'socket.io-client'
import 'bulma/css/bulma.css'
import UserList from './UserList.jsx'
import Card from './Card.jsx'

const socket = openSocket('http://localhost:3000');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            card: null
        }

        socket.on('userConnected', (user) => {
            this.handleUserConnect(user);
        })

        socket.on('userJoinedGame', (gameInfo) => {
            console.log(`${gameInfo.userId} joined ${gameInfo.gameId}, ${gameInfo.currentUserTurn} has current turn`)
        })

        socket.on('userPickedCard', pickInfo => {
            console.log(`${pickInfo.userId} picked ${pickInfo.card.number + pickInfo.card.suit}`)
            this.setState({ card: pickInfo.card })
        })

        socket.on('userDisconnected', (user) => {
            this.handleUserDisconnect(user);
        })
    }

    handleUserConnect(user) {
        let userList = this.state.users;
        userList.push(user)
        this.setState({
            users: userList
        })
    }

    handlePickCard() {
        socket.emit('pickCard')
    }

    handleUserDisconnect(user) {
        let userList = this.state.users.filter(i => i.id !== user.id)
        this.setState({
            users: userList
        })
    }

    componentDidMount() {
        socket.emit('joinGame')
    }

    render() {
        const users = this.state.users
        let card = 'No card'
        if (this.state.card) {
            card = <Card number={this.state.card.number} suit={this.state.card.suit} />
        }
        return (
            <section className="section">
                <div className="container">
                    <h1>House of Kings</h1>
                    {card}
                    <a className="button"
                        onClick={() => this.handlePickCard()}>Pick Card</a>
                    <UserList users={users} />
                </div>
            </section>
        )
    }
}

export default App



import React from 'react'
import openSocket from 'socket.io-client'
import 'bulma/css/bulma.css'
import UserList from './UserList.jsx'

const socket = openSocket('http://localhost:3000');

class App extends React.Component{
    constructor(){
        super();
        this.state = {users:[{id:'100'}]}

        socket.on('userConnected',(user) => {
            this.handleUserConnect(user);
        })

        socket.on('userJoinedGame', (gameInfo) => {
            console.log(gameInfo.userId + ' joined ' + gameInfo.gameName)
        })

        socket.on('userPickedCard', pickInfo => {
            console.log(`${pickInfo.userId} picked ${pickInfo.card.number + pickInfo.card.suit}`)
        })
        
        socket.on('userDisconnected',(user) => {
            this.handleUserDisconnect(user);
        })
    }

    handleUserConnect(user){
        let userList = this.state.users;
        userList.push(user)
            this.setState({
                users:userList
            })
    }

    handlePickCard(){
        socket.emit('pickCard')
    }

    handleUserDisconnect(user){
        let userList = this.state.users.filter(i => i.id !== user.id)
        this.setState({
            users:userList
        })
    }

    componentDidMount(){        
    }

    render(){
        const users = this.state.users;
        return (
            <section className="section">
                <div className="container">
                    <h1>Hey Fliss!!!</h1>
                    <a className="button" 
                    onClick={() => this.handlePickCard()}>Pick Card</a>
                    <UserList users={users}/>
                </div>
            </section>
    )}
}

export default App



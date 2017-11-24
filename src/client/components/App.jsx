import React from 'react';
import openSocket from 'socket.io-client';
import 'bulma/css/bulma.css';
import '../app.css';
import Navbar from './Navbar';
import Game from './Game';
import UsernameModal from './UsernameModal';
import '../../../public/favicon.ico';

const socket = openSocket('http://localhost:3000');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
    };

    this.handleUsernameSelected = this.handleUsernameSelected.bind(this);   
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    if (username) {
      this.handleUsernameSelected(username);
    }
  }

  handleUsernameSelected(usernameSelected) {
    if (!usernameSelected) {
      return;
    }

    localStorage.setItem('username', usernameSelected);
    this.setState({
      username: usernameSelected,
    });
    socket.emit('usernameSelected', usernameSelected);
    socket.emit('joinGame');
  }

  render() {
    const app = this.state.username ?
      <Game socket={socket} username={this.state.username} /> :
      <UsernameModal onSubmit={this.handleUsernameSelected} />;

    return (<div className="full-height"><Navbar />{app}</div>);
  }
}


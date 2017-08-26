import React from 'react'
import openSocket from 'socket.io-client'
import 'bulma/css/bulma.css'

const socket = openSocket('http://localhost:3000');

const App = () => 
    <section className="section">
        <div className="container"><h1>Hey Fliss!!!</h1></div>
    </section>

export default App



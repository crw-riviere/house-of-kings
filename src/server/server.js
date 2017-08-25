import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import App from '../client/components/App'

const server = express();

server.get('/api', (req, res) => {
    res.send({
        message: 'I am das server!!'
    })
})

server.get('*', (req, res) => {

    const app = renderToString(<App/>)
    let html =
        `<!doctype html>
            <html class="no-js" lang="">
                <head>
                    <meta charset="utf-8">
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <title>House of Kings</title>
                    <meta name="description" content="">
                    <meta name="viewport" 
                    content="width=device-width,  initial-scale=1">
                </head>
                <body>
                    <div id="root">${app}</div>
                </body>
        </html>`    

    res.send(html)
})

export default server
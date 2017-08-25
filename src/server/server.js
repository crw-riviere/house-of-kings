import express from 'express'

const apiServer = express();

apiServer.get('/api', (req, res) => {
    res.send({
        message: 'I am das api sevvr!!'
    })
})

export default apiServer
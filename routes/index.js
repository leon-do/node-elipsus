const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const open = require('../routes/open')
const send = require('../routes/send')
const close = require('../routes/close')

app.use(bodyParser.json())
    .use(function(req, res, next) {
        // https://jonathanmh.com/how-to-enable-cors-in-express-js-node-js/
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })
    .use('/open', open)
    .use('/send', send)
    .use('/close', close)
    .listen(process.env.PORT || 8000, console.log('connected to server'))

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const open = require('../routes/open')
const send = require('../routes/send')
const close = require('../routes/close')

app.use(bodyParser.json())
    .use('/open', open)
    .use('/send', send)
    .use('/close', close)
    .listen(process.env.PORT || 8000, console.log('connected to server'))

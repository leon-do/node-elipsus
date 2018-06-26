const express = require('express')
const router = express.Router()
const ethers = require('ethers')
const uuid = require('uuid')
const Transactions = require('../db/Transactions')
const { verify } = require('./verify')

router.post('/', async (req, res) => {
    // "try" to verify if the body is valid...damn you tinkerers!!!!
    const body = req.body
    try {
        await verify(body)
    } catch (e) {
        return res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }

    // add to db
    Transactions.build({
        id: uuid(),
        fromAddress: 'fromAddress' + Math.random(),
        toAddress: 'toaddr' + Math.random(),
        contractAddress: 'kontract' + Math.random(),
        wei: Math.random() * 1000,
        h: 'h--' + Math.random(),
        v: 'v--' + Math.random(),
        r: 'r--' + Math.random(),
        s: 's--' + Math.random()
    }).save()

    // prettier-ignore
    res.send({
        status: goodJob(),
        message: 'good job'
    })
})

// prettier-ignore
goodJob = () => ['️️😀', '😁', '😃', '😄', '😊', '😋', '😎', '🙂', '🤗', '🤩', '🤑', '🤪', '😇', '🤠', '🤓', '😺', '😸'].find((_, index, array) => Math.random() < 1 / (array.length - index)) // lord have mercy do not code like this
// prettier-ignore
badJob = () => ['😡', '🤬', '🤢', '🤮', '💀', '🤱', '🤷‍', '🤦', '👻', '💩', '💔', '🥈', '!🥇', '⛈', '🕷', '📉', '🆘'].find((_, index, array) => Math.random() < 1 / (array.length - index)) // Don't try this at home

module.exports = router

const express = require('express')
const router = express.Router()
const ethers = require('ethers')
const uuid = require('uuid')
const { verify } = require('./verify')

router.post('/', async (req, res) => {
    // "try" to verify if the body is valid...damn you tinkerers!!!!
    const body = req.body
    try {
        await verify(body)
    } catch (e) {
        return res.status(403).send(`verification-error: ${e.message} ${badJob()}`)
    }

    // add to db

    // prettier-ignore
    res.send({
        status: goodJob(),
        data: 123
    })
})

function goodJob() {
    // prettier-ignore
    return ['️️😀', '😁', '😃', '😄', '😊', '😋', '😎', '🙂', '🤗', '🤩', '🤑', '🤪', '😇', '🤠', '🤓', '😺', '😸'].find((_, index, array) => Math.random() < 1 / (array.length - index)) // lord have mercy do not code like this
}

function badJob() {
    // prettier-ignore
    return [ '😐', '😑', '😵', '😡', '😠 ', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '💀', '👻', '💩' ].find((_, index, array) => Math.random() < 1 / (array.length - index)) // Don't try this at home
}

module.exports = router

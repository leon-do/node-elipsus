const express = require('express')
const router = express.Router()
const { verify } = require('./common/verify')
const { ecrecoverAddress } = require('./common/ecrecoverAddress')
const { save } = require('./common/save')

router.post('/', async (req, res) => {
    const body = req.body

    console.log(body)

    // "try" to verify if the body is valid...damn you tinkerers!!!!
    try {
        await verify(body)
    } catch (e) {
        return res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }

    // try to save transaction
    try {
        await save({
            fromAddress: ecrecoverAddress(body),
            toAddress: body.toAddress,
            contractAddress: body.contractAddress,
            wei: body.wei,
            h: body.h,
            v: body.v,
            r: body.r,
            s: body.s
        })
    } catch (e) {
        return res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }

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

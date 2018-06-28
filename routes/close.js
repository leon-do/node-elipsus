const express = require('express')
const router = express.Router()
const { verify } = require('./common/verify')
const { ecrecoverAddress } = require('./common/ecrecoverAddress')
const { save } = require('./common/save')
const { goodJob } = require('./common/goodJob')
const { badJob } = require('./common/badJob')

router.post('/', async (req, res) => {
    const body = req.body

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

    // broadcast transaction

    // try to save closed transaction
    try {
        await save({
            fromAddress: ecrecoverAddress(body),
            toAddress: body.toAddress,
            contractAddress: body.contractAddress,
            wei: 0,
            h: null,
            v: null,
            r: null,
            s: null
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

module.exports = router

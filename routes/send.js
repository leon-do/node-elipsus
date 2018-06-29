const express = require('express')
const router = express.Router()
const { verify } = require('./common/verify')
const { ecrecoverAddress } = require('./common/ecrecoverAddress')
const { saveTransaction } = require('./common/saveTransaction')
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
        const transaction = await saveTransaction({
            fromAddress: ecrecoverAddress(body),
            toAddress: body.toAddress,
            contractAddress: body.contractAddress,
            wei: body.wei,
            h: body.h,
            v: body.v,
            r: body.r,
            s: body.s
        })
        res.send({
            status: goodJob(),
            message: transaction
        })
    } catch (e) {
        return res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }
})

module.exports = router

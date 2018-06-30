const express = require('express')
const router = express.Router()
const { getLastTransaction } = require('./lib/getLastTransaction')
const { goodJob } = require('./lib/goodJob')
const { badJob } = require('./lib/badJob')

router.get('/', async (req, res) => {
    console.log('GET last()')
    try {
        const address = req.query.address
        const contractAddress = req.query.contractAddress
        const lastTransaction = await getLastTransaction(address)
        res.send({
            status: goodJob(),
            message: lastTransaction
        })
    } catch (e) {
        res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }
})

module.exports = router

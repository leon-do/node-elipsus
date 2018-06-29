const express = require('express')
const router = express.Router()
const { getLastTransaction } = require('./common/getLastTransaction')
const { goodJob } = require('./common/goodJob')
const { badJob } = require('./common/badJob')

router.get('/', async (req, res) => {
    try {
        const lastTransaction = await getLastTransaction(req.query)

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

const ethers = require('ethers')
const solc = require('solc')
const express = require('express')
const router = express.Router()
const { verifyTransaction } = require('./lib/verifyTransaction')
const { ecrecoverAddress } = require('./lib/ecrecoverAddress')
const { saveTransaction } = require('./lib/saveTransaction')
const { goodJob } = require('./lib/goodJob')
const { badJob } = require('./lib/badJob')
const solidityCode = require('./lib/solidityCode')

router.post('/', async (req, res) => {
    /*
    "h": "0xd7ef7209d85c5abfa542d2f10d0926a7b511e2eb8ab859a9051422fc91fc034b",
    "v": 27,
    "r": "0xe47573a2d6342cd4b0f81cb100f43e35e4561347edcd6fd18f79b2ccd24f4087",
    "s": "0xace49451d9462b2dd31f467467d31e5492bf907fd8d9862accc6b3821707c35",
    "contractAddress": "0x485A99B6504A535C9a69db6cEaC5371d828e3C88",
    "wei": "8",
    "toAddress": "0x5D723FEa70C04a97458426E35F4568C821b98d1A"
    */
    console.log('POST close() request')
    const transaction = req.transaction

    // "try" to verify if the transaction is valid...damn you tinkerers!!!!
    try {
        await verifyTransaction(transaction)
    } catch (e) {
        return res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }

    // try to save transaction
    try {
        await saveTransaction({
            fromAddress: ecrecoverAddress(transaction),
            toAddress: transaction.toAddress,
            contractAddress: transaction.contractAddress,
            wei: transaction.wei,
            h: transaction.h,
            v: transaction.v,
            r: transaction.r,
            s: transaction.s
        })
    } catch (e) {
        return res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }

    // broadcast transaction
    try {
        const transaction = await broadcast(transaction)
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

    // try to save closed transaction
    try {
        await saveTransaction({
            fromAddress: ecrecoverAddress(transaction),
            toAddress: transaction.toAddress,
            contractAddress: transaction.contractAddress,
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
})

module.exports = router

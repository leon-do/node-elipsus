const express = require('express')
const router = express.Router()
const { verifyTransaction } = require('./lib/verifyTransaction')
const { ecrecoverAddress } = require('./lib/ecrecoverAddress')
const { saveTransaction } = require('./lib/saveTransaction')
const { signTransaction } = require('./lib/signTransaction')
const { getLastTransaction } = require('./lib/getLastTransaction')
const { goodJob } = require('./lib/goodJob')
const { badJob } = require('./lib/badJob')

router.post('/', async (req, res) => {
    console.log('POST send() request')
    /*
    fromTransaction =
    "h": "0xd7ef7209d85c5abfa542d2f10d0926a7b511e2eb8ab859a9051422fc91fc034b",
    "v": 27,
    "r": "0xe47573a2d6342cd4b0f81cb100f43e35e4561347edcd6fd18f79b2ccd24f4087",
    "s": "0xace49451d9462b2dd31f467467d31e5492bf907fd8d9862accc6b3821707c35",
    "contractAddress": "0x485A99B6504A535C9a69db6cEaC5371d828e3C88",
    "wei": "8",
    "toAddress": "0x5D723FEa70C04a97458426E35F4568C821b98d1A"
    */

    try {
        // get transaction body from user
        const fromTransaction = req.body
        // see if we have a contract with the toAddress
        toAddressInfo = await getLastTransaction(fromTransaction.toAddress)
        // verify if the message is valid
        await verifyTransaction(fromTransaction)
        // save transaction
        await saveTransaction({
            fromAddress: ecrecoverAddress(fromTransaction.h, fromTransaction.v, fromTransaction.r, fromTransaction.s),
            toAddress: fromTransaction.toAddress,
            contractAddress: fromTransaction.contractAddress,
            wei: fromTransaction.wei,
            h: fromTransaction.h,
            v: fromTransaction.v,
            r: fromTransaction.r,
            s: fromTransaction.s
        })
        // now that we have the mulahlah, we can now send wei to address toAddress 🤣
        const nodeTransaction = signTransaction({
            wei: fromTransaction.wei,
            contractAddress: toAddressInfo.contractAddress,
            toAddress: fromTransaction.toAddress
        })
        // verify if the message is valid
        console.log('verrrrifitying server transaction')
        await verifyTransaction(nodeTransaction)
        // save our transaction
        const savedTransaction = await saveTransaction(nodeTransaction)
        // 🌈Success!
        return res.send({
            status: goodJob(),
            message: savedTransaction
        })
    } catch (e) {
        return res.status(403).send({
            status: badJob(),
            error: e.message
        })
    }
})

module.exports = router

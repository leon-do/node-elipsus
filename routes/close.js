const ethers = require('ethers')
const solc = require('solc')
const express = require('express')
const router = express.Router()
const { verify } = require('./common/verify')
const { ecrecoverAddress } = require('./common/ecrecoverAddress')
const { saveTransaction } = require('./common/saveTransaction')
const { goodJob } = require('./common/goodJob')
const { badJob } = require('./common/badJob')
const solidityCode = require('./common/solidityCode')

// @TODO
const PRIVATEKEY = '0x0123456789012345678901234567890123456789012345678901234567890123'

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
        await saveTransaction({
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
    try {
        const transaction = await broadcast(body)
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
})

async function broadcast(_args) {
    const provider = ethers.providers.getDefaultProvider('rinkeby')
    const wallet = new ethers.Wallet(PRIVATEKEY, provider)

    const output = solc.compile(solidityCode, 1)

    let abi
    for (let contractName in output.contracts) {
        abi = JSON.parse(output.contracts[contractName].interface)
    }

    // locked and loaded
    const contract = new ethers.Contract(_args.contractAddress, abi, wallet)

    // call function
    const sendPromise = await contract.Close(_args.h, _args.v, _args.r, _args.s, _args.wei)
    return sendPromise
}

module.exports = router

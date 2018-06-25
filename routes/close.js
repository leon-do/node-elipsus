const express = require('express')
const router = express.Router()
const ethers = require('ethers')
const util = require('ethereumjs-util')

/*
h: '0x8cd4c3abcb1eadd841b112113db863b878996f34863252249b60247a885ad05c',
v: 27,
r: '0xa75d17737a0f94a5a20c5b3165c0cf8c212079eee33c08684a0ffb53910cf9dd',
s: '0x4a48d839a44928d401abb9c8e5f122f6cc73b0114ee1d7deefe9acd42534bfe',
contractAddress: '0xB928D5655C7520f2405468f046224B3F1B93F17E',
wei: 232323
*/
router.post('/', (req, res) => {
    const { h, v, r, s, contractAddress, wei } = req.body
    // ecrecover verification
    const bufferAddress = util.ecrecover(util.toBuffer(h), v, r, s)
    // get address
    const verifiedAddress = '0x' + util.publicToAddress(bufferAddress).toString('hex')
    // verify amount and contract address
    const proof = ethers.utils.solidityKeccak256(['address', 'uint'], [contractAddress, wei])
    if (proof.toLowerCase() !== h.toLowerCase()) {
        return res.status(404).send({
            error: 'invalid-contract-address-or-wei'
        })
    }
    // after everything is valid, query db

    // send
    res.send([1, 2, 3, 4, 4])
})

module.exports = router

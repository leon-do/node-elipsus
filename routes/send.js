const express = require('express')
const router = express.Router()
const ethers = require('ethers')
const util = require('ethereumjs-util')

/*
{ 
	"h": "0xc1cae7a6a9ffe7817ac1d6443cd0a3adc2ced1e0d3f0e151038350356e16cb16",
	"v": "27",
	"r": "0xa3de9b63ed4bb133d850e681877a71e8124c32f716c3bcb8655776b22ee0d9d7",
	"s": "0x82203546ad8a206dd5ecffb0b0d53b7b012b1ce70e04e561aa041099152483e",
	"fromAddress": "0xdD6fBbd0b8A23aF5eFbDefBF16A3A22497E203c4",
	"toAddress": "0xB928D5655C7520f2405468f046224B3F1B93F17E",
	"contractAddress": "0xB928D5655C7520f2405468f046224B3F1B93F17E",
	"wei": 55
}
*/
router.post('/', (req, res) => {
    const { h, v, r, s, fromAddress, toAddress, contractAddress, wei } = req.body
    // ecrecover verification
    const bufferAddress = util.ecrecover(util.toBuffer(h), v, r, s)
    // get address
    const verifiedAddress = '0x' + util.publicToAddress(bufferAddress).toString('hex')
    // verify signature
    if (verifiedAddress.toLowerCase() !== fromAddress.toLowerCase()) {
        return res.status(404).send({
            error: 'invalid-signature'
        })
    }
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

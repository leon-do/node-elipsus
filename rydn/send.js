const ethers = require('ethers')
const axios = require('axios')

// send(
//     '0x0123456789012345678901234567890123456789012345678901234567890123',
//     '0xB928D5655C7520f2405468f046224B3F1B93F17E',
//     '0xB928D5655C7520f2405468f046224B3F1B93F17E',
//     55
// ).then(data_needed_to_POST_to_server => {
//     console.log(data_needed_to_POST_to_server)
// })

async function send(_privateKey, _contractAddress, _wei) {
    // get signing key
    const signingKey = new ethers.SigningKey(_privateKey)
    // get fromAddress
    const fromAddress = signingKey.address
    // hash fromAddress: https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=keccak256
    const h = ethers.utils.solidityKeccak256(['address', 'uint'], [_contractAddress, _wei])
    // sign and split hashed address: https://github.com/ethers-io/ethers.js/issues/85
    const { r, s, recoveryParam } = signingKey.signDigest(h)
    const v = 27 + recoveryParam

    const body = { h, v, r, s, _contractAddress, _wei }

    return body
}

module.exports = { send }

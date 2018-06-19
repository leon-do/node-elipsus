const ethers = require('ethers')
const axios = require('axios')

async function send(_privateKey) {
    const toAddress = '0xB928D5655C7520f2405468f046224B3F1B93F17E'
    const contractAddress = '0xB928D5655C7520f2405468f046224B3F1B93F17E'
    const wei = 55

    // get signing key
    const signingKey = new ethers.SigningKey(_privateKey)
    // get fromAddress
    const fromAddress = signingKey.address
    // hash fromAddress: https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=keccak256
    const h = ethers.utils.solidityKeccak256(['address', 'uint'], [contractAddress, wei])
    // sign and split hashed address: https://github.com/ethers-io/ethers.js/issues/85
    const { r, s, recoveryParam } = signingKey.signDigest(h)
    const v = 27 + recoveryParam

    const body = { h, v, r, s, fromAddress, toAddress, contractAddress, wei }

    const response = await axios.post('http://localhost:8000/send', body)
}

module.exports = { send }

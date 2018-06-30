const ethers = require('ethers')
const PRIVATEKEY = require('./PRIVATEKEY')

function signTransaction(_args) {
    const { contractAddress, wei, toAddress } = _args
    // prep signing key
    const signingKey = new ethers.SigningKey(PRIVATEKEY)
    const fromAddress = signingKey.address
    // hash message
    const h = ethers.utils.solidityKeccak256(['address', 'uint'], [contractAddress, ethers.utils.bigNumberify(wei)])
    // sign and split message: https://github.com/ethers-io/ethers.js/issues/85
    const { r, s, recoveryParam } = signingKey.signDigest(h)
    const v = 27 + recoveryParam
    return { fromAddress, toAddress, contractAddress, wei, h, v, r, s }
}

module.exports = { signTransaction }

const ethers = require('ethers')

async function sign(privateKey, contractAddress, wei) {
    // get signing key
    const signingKey = new ethers.SigningKey(privateKey)
    // hash fromAddress: https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=keccak256
    const h = ethers.utils.solidityKeccak256(['address', 'uint'], [contractAddress, wei])
    // sign and split hashed address: https://github.com/ethers-io/ethers.js/issues/85
    const { r, s, recoveryParam } = signingKey.signDigest(h)
    const v = 27 + recoveryParam
    // data needed to POST to /send
    return { h, v, r, s, contractAddress, wei }
}

module.exports = { sign }

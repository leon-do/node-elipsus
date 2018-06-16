const axios = require('axios')
const ethers = require('ethers')

/**
 * gets balance
 * @param _privateKey - 0x0123456789012345678901234567890123456789012345678901234567890123
 * @returns balance - 9876
 */
balance('0x0123456789012345678901234567890123456789012345678901234567890123')
async function balance(_privateKey) {
    // get signing key
    const signingKey = new ethers.SigningKey(_privateKey)
    // get address
    const address = signingKey.address
    // hash address: https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=keccak256
    const h = ethers.utils.solidityKeccak256(['address'], [address])
    // sign and split hashed address: https://github.com/ethers-io/ethers.js/issues/85
    const {r, s, recoveryParam} = signingKey.signDigest(h)
    const v = 27 + recoveryParam
    /*
    body = { h: '0x6220c8c9dbdaa9ef797bc09af02df84a1e754d6070e97773c116e97dc18919dd',
    v: 27,
    r: '0x5c3c8ee876a1063783e71f654f2fc5fec529a7b052e8a85b382401f3792e3784',
    s: '0x4c0c844740103c7b9b5f7b0d76d20255fbbdccc0e6df64c40ef79582fec5e479',
    address: '0x14791697260E4c9A71f18484C9f997B308e59325' }
    */
    const body = { h, v, r, s, address } 
    // post body
    const response = await axios.post('http://localhost:8000/balance', body)
    // return data
    const balance = response.data
    return balance
}

module.exports = {balance}

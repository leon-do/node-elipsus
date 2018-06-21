const ethers = require('ethers')
const axios = require('axios')

/*
sign [contractAddress, wei, 'close']
*/
async function close(_privateKey) {
    // get contract address and wei
    // const { contractAddress, wei } = await axios
    //     .get('http://localhost:8000/balance')
    //     .then(response => response.data)
    //     .catch(e => {
    //         console.log(e.response.data)
    //         return new Error(e.response.data)
    //     })

    const contractAddress = '0xB928D5655C7520f2405468f046224B3F1B93F17E'
    const wei = 232323

    // get signing key
    const signingKey = new ethers.SigningKey(_privateKey)
    // hash fromAddress: https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=keccak256
    const h = ethers.utils.solidityKeccak256(
        ['address', 'uint', 'string'],
        [contractAddress, wei, 'close']
    )
    // sign and split hashed address: https://github.com/ethers-io/ethers.js/issues/85
    const { r, s, recoveryParam } = signingKey.signDigest(h)
    const v = 27 + recoveryParam

    // post body
    const body = { h, v, r, s, contractAddress, wei }

    // post
    const message = await axios
        .post('http://localhost:8000/close', body)
        .then(response => response.data)
        .catch(e => {
            console.log(e)
            return new Error(e.response.data)
        })
}

module.exports = { close }

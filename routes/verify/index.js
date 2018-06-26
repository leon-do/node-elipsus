const { ecrecoverAddress } = require('./ecrecoverAddress')
const { getBalance } = require('./getBalance')
const { getLastTransaction } = require('./getLastTransaction')

verify({
    h: '0xc1cae7a6a9ffe7817ac1d6443cd0a3adc2ced1e0d3f0e151038350356e16cb16',
    v: '27',
    r: '0xa3de9b63ed4bb133d850e681877a71e8124c32f716c3bcb8655776b22ee0d9d7',
    s: '0x82203546ad8a206dd5ecffb0b0d53b7b012b1ce70e04e561aa041099152483e',
    contractAddress: '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    wei: 55
})
    .then(response => {
        // true 🙏🏼
        console.log(response)
    })
    .catch(e => {
        console.log(e)
    })

async function verify(_body) {
    console.log('verifying...')
    // convert h,v,r,s to address
    const address = ecrecoverAddress(_body)
    // get the latest transaction from db
    const last = await getLastTransaction({
        contractAddress: _body.contractAddress,
        address: address
    })
    // get balance of contract from the source of truth
    const contractBalance = await getBalance(_body.contractAddress)

    if (Number(_body.wei) <= Number(last.wei)) {
        throw new Error(`the amount of wei is wei off`)
    }

    // don't sign a tx your ass can't cash
    if (Number(_body.wei) >= Number(contractBalance)) {
        throw new Error(`don't sign a off-chain transactions your ass can't broadcast aka please fund your contract with more ETH: ${_body.contractAddress}`)
    }

    return true
}

module.exports = { verify }

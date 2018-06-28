const ethers = require('ethers')
const { ecrecoverAddress } = require('./ecrecoverAddress')
const { getBalance } = require('./getBalance')
const { getLastTransaction } = require('./getLastTransaction')

/*
verify({
    h: '0xc1cae7a6a9ffe7817ac1d6443cd0a3adc2ced1e0d3f0e151038350356e16cb16',
    v: '27',
    r: '0xa3de9b63ed4bb133d850e681877a71e8124c32f716c3bcb8655776b22ee0d9d7',
    s: '0x82203546ad8a206dd5ecffb0b0d53b7b012b1ce70e04e561aa041099152483e',
    contractAddress: '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    wei: 55
})
    .then(response => {
        console.log(response)
    })
*/
async function verify(_body) {
    // convert h,v,r,s to address
    const address = ecrecoverAddress(_body)
    // get the latest transaction from db
    const last = await getLastTransaction({
        contractAddress: _body.contractAddress,
        address: address
    })
    // get balance of contract from THE source of truth
    const contractBalance = await getBalance(_body.contractAddress)
    // if user is sending less than last signed transaction (_body.wei <= last.wei), then error
    if (new ethers.utils.BigNumber(_body.wei).lte(new ethers.utils.BigNumber(last.wei))) {
        const minimum = new ethers.utils.BigNumber(last.wei).add('1').toString()
        throw new Error(`the amount of wei is wei off. send at least ${minimum}`)
    }
    // if user is sending more than contract balance (_body.wei >= contractBalance), then error
    if (new ethers.utils.BigNumber(_body.wei).gt(new ethers.utils.BigNumber(contractBalance.toString()))) {
        throw new Error(`i wants to spend ${_body.wei} but i only has ${contractBalance}`)
    }

    return true
}

module.exports = { verify }

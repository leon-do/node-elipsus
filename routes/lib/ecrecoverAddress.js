const util = require('ethereumjs-util')

/* Ill-Deal-With-It-Later-V81.4.Test
const address = ecrecoverAddress({
    h: '0xc1cae7a6a9ffe7817ac1d6443cd0a3adc2ced1e0d3f0e151038350356e16cb16',
    v: '27',
    r: '0xa3de9b63ed4bb133d850e681877a71e8124c32f716c3bcb8655776b22ee0d9d7',
    s: '0x82203546ad8a206dd5ecffb0b0d53b7b012b1ce70e04e561aa041099152483e'
})
console.log(address, address === '0xdd6fbbd0b8a23af5efbdefbf16a3a22497e203c4')
*/
function ecrecoverAddress(h, v, r, s) {
    try {
        // who da fuk signed this?
        const addressBuffer = util.ecrecover(util.toBuffer(h), v, r, s)
        // convert addressBuffer to something readable
        return '0x' + util.publicToAddress(addressBuffer).toString('hex')
    } catch (e) {
        console.log(e)
        throw new Error('unable ecrecover your parsed message')
    }
}

module.exports = { ecrecoverAddress }

const Transactions = require('../../db/Transactions')
const Op = require('sequelize').Op
/* Ill-Deal-With-It-Later-V4.5.4.1.Test
getLastTransaction({
    contractAddress: '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    address: '0xdd6fbbd0b8a23af5efbdefbf16a3a22497e203c4'
}).then(transaction => {
    // { id: 'd6b58caf-f31d-412b-bcbe-3a182739332e', fromAddress: '0xdd6fbbd0b8a23af5efbdefbf16a3a22497e203c4', toAddress: null, contractAddress: '0xB928D5655C7520f2405468f046224B3F1B93F17E', wei: '50', h: '0xc1cae7a6a9ffe7817ac1d6443cd0a3adc2ced1e0d3f0e151038350356e16cb16', v: '27', r: '0xa3de9b63ed4bb133d850e681877a71e8124c32f716c3bcb8655776b22ee0d9d7', s: '0x82203546ad8a206dd5ecffb0b0d53b7b012b1ce70e04e561aa041099152483e', createdAt: 2018-06-25T06:38:26.515Z, updatedAt: 2018-06-25T06:38:26.515Z }
    console.log(transaction)
})
*/

async function getLastTransaction(_address) {
    // don't fail me db
    try {
        // if you can make this more efficient, then i hate you .then please submit a PR
        const response = await Transactions.findAll({
            limit: 1,
            where: {
                fromAddress: _address.toLowerCase()
            },
            order: [['createdAt', 'DESC']]
        })
        return response[0].dataValues
    } catch (e) {
        console.log(e)
        throw new Error(`could not find last transaction for ${_address}`)
    }
}

module.exports = { getLastTransaction }

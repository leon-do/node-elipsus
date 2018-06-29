const Transactions = require('../../db/Transactions')
const uuid = require('uuid')

/*
save({
    fromAddress: '0x61087C6eB131e4cDAC737De7739Cf9Ff725D59b3',
    toAddress: '0x485A99B6504A535C9a69db6cEaC5371d828e3C88',
    contractAddress: '0x485A99B6504A535C9a69db6cEaC5371d828e3C88',
    wei: 4000000000000000,
    h: '0x94965a9e73da249eeece216b348ac666d3ee60aa61637bf8692b1728c751a0df',
    v: '27',
    r: '0xba1e0c58cc2383d1d0f8ec1e3dd2d8aec0684f904aa2a2b888609e0d2aebabca',
    s: '0x2c4db16ad09bd5fa08accec8b729d23eaacebf364115decc301270d336052be3'
}).then(response => {
    // true
    console.log(response)
})
*/

async function saveTransaction(_column) {
    try {
        const response = await Transactions.build({
            id: uuid(),
            fromAddress: _column.fromAddress.toLowerCase(),
            toAddress: _column.toAddress,
            contractAddress: _column.contractAddress.toLowerCase(),
            wei: _column.wei,
            h: _column.h,
            v: _column.v,
            r: _column.r,
            s: _column.s
        }).save()
        return response.dataValues
    } catch (e) {
        console.log(e)
        throw new Error('unable to save. plx try again')
    }
}

module.exports = { saveTransaction }

const ethers = require('ethers')

/*
const donations = '0xdD6fBbd0b8A23aF5eFbDefBF16A3A22497E203c4'
getBalance(donations).then(wei => {
    // hopefully > 0
    console.log(wei)
})
*/
async function getBalance(_address) {
    return 9000000000000000000
    try {
        const response = await ethers.providers.getDefaultProvider('rinkeby').getBalance(_address)
        return Number(response.toString())
    } catch (e) {
        console.log(e)
        throw new Error(`could not get balance for ${_address}`)
    }
}

module.exports = { getBalance }

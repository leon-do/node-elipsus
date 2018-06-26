const ethers = require('ethers')

/*
const donations = '0xdD6fBbd0b8A23aF5eFbDefBF16A3A22497E203c4'
getBalance(donations).then(wei => {
    // hopefully > 0
    console.log(wei)
})
*/
async function getBalance(_address) {
    try {
        const response = await ethers.providers.getDefaultProvider().getBalance(_address)
        return Number(response.toString())
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = { getBalance }

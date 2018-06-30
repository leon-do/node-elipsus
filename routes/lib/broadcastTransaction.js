const PRIVATEKEY = require('./PRIVATEKEY')

async function broadcastTransaction(_args) {
    const provider = ethers.providers.getDefaultProvider('rinkeby' || 'homestead')
    const wallet = new ethers.Wallet(PRIVATEKEY, provider)

    const output = solc.compile(solidityCode, 1)

    let abi
    for (let contractName in output.contracts) {
        abi = JSON.parse(output.contracts[contractName].interface)
    }

    // locked and loaded
    const contract = new ethers.Contract(_args.contractAddress, abi, wallet)

    // call function
    const sendPromise = await contract.Close(_args.h, _args.v, _args.r, _args.s, _args.wei)
    return sendPromise
}

module.exports = { broadcastTransaction }

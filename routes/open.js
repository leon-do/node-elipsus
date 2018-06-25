const express = require('express')
const router = express.Router()
const ethers = require('ethers')
const solc = require('solc')
const db = require('../db')
const network = 'rinkeby'

router.post('/', async (req, res) => {
    try {
        const { signedTransaction, nodeAddress, startDate, channelTimeout } = req.body

        // verify if we own the nodeAddress
        if ((await isOwner(nodeAddress)) === false) {
            return res.status(400).send('invalid-nodeAddress')
        }

        // parse client transaction
        const parsedTransaction = ethers.Wallet.parseTransaction(signedTransaction)
        const fromAddress = parsedTransaction.from
        const parsedBytecode = parsedTransaction.data

        // create contract
        const contract = generateContract({
            fromAddress,
            nodeAddress,
            startDate,
            channelTimeout
        })
        // compile
        const compiledContract = compileContract(contract)
        const compiledBytecode = compiledContract.bytecode
        const abi = compileContract.abi

        // verify parsed bytecode from client
        // matches our compiled bytecode
        if (parsedBytecode !== compiledBytecode) {
            return res.status(400).send('invalid-signature')
        }

        // broadcast
        const transactionHash = await ethers.providers
            .getDefaultProvider(network)
            .sendTransaction(signedTransaction)

        // wait for contract address
        let contractAddress = '0xshittt'
        while (contractAddress === null) {
            await pause(3000)
            console.log('fetching-contract-address-from', transactionHash)
            contractAddress = await ethers.providers
                .getDefaultProvider(network)
                .getTransaction(transactionHash)
                .then(response => response.creates)
        }

        // save to db
        db.Open.create({
            contractAddress,
            signedTransaction,
            nodeAddress,
            startDate,
            channelTimeout
        })

        // send
        return res.send(contractAddress)
    } catch (e) {
        return res.status(400).send(e.message)
    }
})

async function isOwner(_address) {
    try {
        const response = await db.NodeAddress.findOne({
            where: {
                address: _address
            }
        })
        return response.address === _address
    } catch (e) {
        console.log(e)
        return false
    }
}

function compileContract(_contract) {
    try {
        let abi
        let bytecode
        const output = solc.compile(_contract, 1)
        for (const contractName in output.contracts) {
            bytecode = output.contracts[contractName].bytecode
            abi = JSON.parse(output.contracts[contractName].interface)
        }
        bytecode = '0x' + bytecode
        return { abi, bytecode }
    } catch (e) {
        console.log(e)
        return new Error('unable-to-compile-contract')
    }
}

function pause(_milliseconds) {
    return new Promise(res => {
        setTimeout(() => {
            res(true)
        }, _milliseconds)
    })
}

function generateContract(_args) {
    // I know this can be aconstructor. FUck it.
    return `
        pragma solidity ^0.4.0;

        contract Channel {

            address public fromAddress = ${_args.fromAddress};
            address public nodeAddress = ${_args.nodeAddress};
            uint public startDate = ${_args.startDate};
            uint public channelTimeout = ${_args.channelTimeout};
            
            constructor() payable {}

            function CloseChannel(bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s, uint _wei) public {
                address signer;
                bytes32 proof;
                
                signer = ecrecover(_h, _v, _r, _s);

                if (signer != fromAddress) revert();

                proof = keccak256(this, _wei);

                if (proof != _h) revert();

                nodeAddress.transfer(_wei);
                
                selfdestruct(fromAddress);
            }

            function ChannelTimeout() public {
                if (startDate + channelTimeout > now) revert();

                selfdestruct(fromAddress);
            }

        }
    `
}

module.exports = router

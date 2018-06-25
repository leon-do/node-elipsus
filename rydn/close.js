const ethers = require('ethers')

/*
close(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
    '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    55
).then(data_needed_to_POST_to_server => {
    console.log(data_needed_to_POST_to_server)
    // should equal. (this is called Ill-Deal-With-It-Later-V3.33...Test)
    // { h: '0x47209e1514feadb88f8296ee15116524963b99b9cc9dba234ec5f85d37153f06',
    // v: 27,
    // r: '0x867efa6d01afbcfa53bce3700e0ef7619e0c81fe4b37ecd4658a2f205815236c',
    // s: '0x5018a1ea50943eeefdff9adff08d5ba450658f45db61552655cd6678ed5e69c4',
    // _contractAddress: '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    // _wei: '0xB928D5655C7520f2405468f046224B3F1B93F17E' }
})
*/

async function close(_privateKey, _contractAddress, _wei) {
    // get signing key
    const signingKey = new ethers.SigningKey(_privateKey)
    // fromAddress aka the address you have full control over #smhplz
    const fromAddress = signingKey.address
    // https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=keccak256
    const h = ethers.utils.solidityKeccak256(
        ['address', 'uint'],
        [_contractAddress, ethers.utils.bigNumberify(_wei)]
    )
    // sign and split message: https://github.com/ethers-io/ethers.js/issues/85
    const { r, s, recoveryParam } = signingKey.signDigest(h)
    const v = 27 + recoveryParam
    // shit you wAnT give to the server #smhplz
    return { h, v, r, s, _contractAddress, _wei }
}

module.exports = { close }

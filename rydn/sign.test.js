const { sign } = require('./sign')

// too lazy for real tests
sign(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
    '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    '0xB928D5655C7520f2405468f046224B3F1B93F17E',
    55
).then(data => {
    const expected = {
        h: '0x47209e1514feadb88f8296ee15116524963b99b9cc9dba234ec5f85d37153f06',
        v: 27,
        r: '0x867efa6d01afbcfa53bce3700e0ef7619e0c81fe4b37ecd4658a2f205815236c',
        s: '0x5018a1ea50943eeefdff9adff08d5ba450658f45db61552655cd6678ed5e69c4',
        contractAddress: '0xB928D5655C7520f2405468f046224B3F1B93F17E',
        wei: '0xB928D5655C7520f2405468f046224B3F1B93F17E'
    }

    console.log(expected.h === data.h)
    console.log(expected.v === data.v)
    console.log(expected.r === data.r)
    console.log(expected.s === data.s)
    console.log(expected.contractAddress === data.contractAddress)
    console.log(expected.wei === data.wei)
})

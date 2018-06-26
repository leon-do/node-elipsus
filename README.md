`node app.js`

https://github.com/leon-do/contract

signerAddress: 0x61087C6eB131e4cDAC737De7739Cf9Ff725D59b3

```
// insert row
Transactions.build({
    id: uuid(),
    fromAddress: 'fromAddress' + Math.random(),
    toAddress: 'toaddr' + Math.random(),
    contractAddress: 'kontract' + Math.random(),
    wei: Math.random() * 1000,
    h: 'h--' + Math.random(),
    v: 'v--' + Math.random(),
    r: 'r--' + Math.random(),
    s: 's--' + Math.random()
}).save()
```

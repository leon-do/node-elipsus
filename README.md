`node app.js`

https://github.com/leon-do/contract

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

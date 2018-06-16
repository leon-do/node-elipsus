const rydn = require('./rydn')

const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'

start()
async function start() {
    const balance = await rydn.balance(privateKey)
    console.log(balance)
    const transaction = await rydn.close(privateKey)
}
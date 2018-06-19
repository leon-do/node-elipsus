const rydn = require('./rydn')

const privateKey =
    '0x0123456789012345678901234567890123456789012345678901234567890123'

start()
async function start() {
    await rydn.open(privateKey)
}

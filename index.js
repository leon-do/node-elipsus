const rydn = require('./rydn')

const privateKey = ''

start()
async function start() {
    const x = await rydn.open(privateKey)
    console.log(x)
}

const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    // "try" to verify if the body is valid...damn you tinkerers!!!!
    const body = req.body
    try {
        verify(body)
    } catch (e) {
        console.log(e)
        // throw it back
        return res.status(403).send({ '🤕': e })
    }

    // prettier-ignore
    const status = ['️️😀', '😁', '😃', '😄', '😊', '😋', '😎', '🙂', '🤗', '🤩', '🤑', '🤪', '😇', '🤠', '🤓', '😺', '😸'].find((_, index, array) => Math.random() < 1 / (array.length - index)) // lord have mercy do not code like this

    res.send({
        status
    })
})

function verify(body) {
    let valid = false

    if (false) {
        throw 'invalid-body damn you tinkerers!!!!'
    }
}

module.exports = router

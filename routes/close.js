const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log('close:', req.body)
    // send
    res.send('closed')
})

module.exports = router

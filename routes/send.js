const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log('send:', req.body)
    // send
    res.send('sent')
})

module.exports = router

const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    console.log('POST open() request')
    res.send('opened!')
})

module.exports = router

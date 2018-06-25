const Sequelize = require('sequelize')
const sequelize = require('../startup/db')

const Send = sequelize.define('send', {
    id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV
    },
    fromAddress: {
        type: Sequelize.STRING
    },
    toAddress: {
        type: Sequelize.STRING
    },
    contractAddress: {
        type: Sequelize.STRING
    },
    wei: {
        type: Sequelize.STRING
    },
    h: {
        type: Sequelize.STRING
    },
    v: {
        type: Sequelize.STRING
    },
    r: {
        type: Sequelize.STRING
    },
    s: {
        type: Sequelize.STRING
    }
})

// WARNING: uncommenthing this true will drop the table if it already exists
// Send.sync({force: true})

module.exports = Send

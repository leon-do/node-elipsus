const Sequelize = require('sequelize')
const sequelize = require('../startup/db')

const Open = sequelize.define('open', {
    id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4
    },
    contractAddress: {
        type: Sequelize.STRING
    },
    signedTransaction: {
        type: Sequelize.TEXT
    },
    nodeAddress: {
        type: Sequelize.STRING
    },
    startDate: {
        type: Sequelize.DATE
    },
    channelTimeout: {
        type: Sequelize.INTEGER
    }
})

// WARNING: uncommenthing this true will drop the table if it already exists
// Open.sync({ force: true })

module.exports = Open

const Sequelize = require('sequelize')
const sequelize = require('../startup/db')

const Close = sequelize.define('close', {
    id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4
    },
    contractAddress: {
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
Close.sync({ force: true })

module.exports = Close

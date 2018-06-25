// http://docs.sequelizejs.com/manual/installation/getting-started
const Sequelize = require('sequelize')

const sequelize = new Sequelize('rydnDb', '', '', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false // true for debugging/testing
})

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('connected to db')
    })
    .catch(err => {
        console.error('Unable to connect to the db:', err)
    })

module.exports = sequelize

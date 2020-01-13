const Sequelize = require('sequelize')
const PairModel = require('./models/pair')
const HistoricalRateModel = require('./models/historicalRate')

const {DATABASE_NAME, USERNAME, PASSWORD, HOST, DIALECT} = require('./db')
const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
const Pair = PairModel(sequelize, Sequelize)
const HistoricalRate = HistoricalRateModel(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(() => {})

module.exports = {
    Pair,
    HistoricalRate,
}
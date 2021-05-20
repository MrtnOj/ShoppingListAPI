import { Sequelize } from 'sequelize'
import { config } from '../constants'

const sequelize = new Sequelize('shoppinglist', config.db.user, config.db.password, {
    dialect: 'postgres',
    host: 'localhost'
})

export default sequelize

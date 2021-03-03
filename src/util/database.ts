import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('shoppinglist', 'postgres', '1', {
    dialect: 'postgres',
    host: 'localhost'
})

export default sequelize

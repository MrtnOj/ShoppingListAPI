import { Sequelize, Model, DataTypes } from 'sequelize'
import sequelize from '../util/database'

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

export default Category
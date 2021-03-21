import { Sequelize, Model, DataTypes } from 'sequelize'
import sequelize from '../util/database'

export interface CategoryAttributes extends Model {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date
}

const Category = sequelize.define<CategoryAttributes>('category', {
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
}, { timestamps: false})

export default Category
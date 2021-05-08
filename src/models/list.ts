import { DataTypes, Model, Sequelize, Optional } from 'sequelize'
import db from '../util/database'

export interface ListAttributes extends Model {
    id: number;
    name: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

const List = db.define<ListAttributes>('list', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    }
})

export default List
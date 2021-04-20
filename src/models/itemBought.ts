import { DataTypes, Model, Sequelize, Optional } from 'sequelize'
import db from '../util/database'

export interface ItemBoughtAttributes extends Model {
    id: number;
    userId: number;
    bought: Date
}

const ItemBought = db.define<ItemBoughtAttributes>('item_bought', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bought: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {timestamps: false})


export default ItemBought
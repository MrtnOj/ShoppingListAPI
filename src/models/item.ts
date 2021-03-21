import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../util/database'

import Category from './category'


export interface ItemInterface extends Model {
    id: number;
    name: string;
    categoryId?: number;
    lasts?: number;
    lastBought?: Date;
    createdAt: Date;
    updatedAt: Date
}

const Item = db.define<ItemInterface>('item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lasts: {
        type: DataTypes.INTEGER
    },
    last_bought: {
        type: DataTypes.DATE
    }

}, { timestamps: false})

export default Item
import { Sequelize, Model, DataTypes } from 'sequelize'
import sequelize from '../util/database'

import Category from './category'


export interface ItemInterface {
    id: number;
    name: string;
    categoryId?: number;
    lasts?: number;
    lastBought?: Date 
}

const Item = sequelize.define('item', {
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
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    lasts: {
        type: DataTypes.INTEGER
    },
    last_bought: {
        type: DataTypes.DATE
    }

})

export default Item
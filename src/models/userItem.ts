import { DataTypes, Model } from 'sequelize'
import db from '../util/database'

export interface UserItemAttributes extends Model {
    id: number;
    lasts: Date;
    lastBought: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserItem = db.define<UserItemAttributes>('user_item', {
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
    lastBought: {
        type: DataTypes.DATE
    }
})

export default UserItem
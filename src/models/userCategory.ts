import { DataTypes, Model } from 'sequelize'
import db from '../util/database'

export interface UserCategoryAttributes extends Model {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserCategory = db.define<UserCategoryAttributes>('user_category', {
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

export default UserCategory
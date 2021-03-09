import { DataTypes, Model, Sequelize, Optional } from 'sequelize'
import db from '../util/database'

export interface UserAttributes extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date
}

interface UserCreationAttributes 
    extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

interface UserInstance 
    extends Model<UserAttributes, UserCreationAttributes> {}

const User = db.define<UserAttributes>('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User
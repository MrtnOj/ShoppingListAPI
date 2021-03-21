import { DataTypes, Model } from 'sequelize'
import db from '../util/database'

export interface ListItemAttributes extends Model {
    id: number;
    listId: number;
    createdAt: Date;
    updatedAt: Date;
}

const ListItem = db.define<ListItemAttributes>('list_item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

export default ListItem
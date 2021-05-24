import express from 'express' 
import bodyParser from 'body-parser'
import itemsRoutes from './routes/items'
import categoriesRoutes from './routes/categories'
import authRoutes from './routes/auth'
import listRoutes from './routes/list'

import Item from './models/item'
import Category from './models/category'
import User from './models/user'
import List from './models/list'
import ListItem from './models/listItem'
import UserItem from './models/userItem'
import UserCategory from './models/userCategory'
import ItemBought from './models/itemBought'

import sequelize from './util/database'

import { Request, Response, NextFunction } from 'express'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

const test = (req: Request, res: Response, next: NextFunction) => {
    res.send('Heyo')
}


app.use('/api/doo/', test)
app.use('/api/items', itemsRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/list', listRoutes)


Item.belongsTo(Category)
Category.hasMany(Item)

UserItem.belongsTo(User)
UserCategory.belongsTo(User)

UserItem.belongsTo(UserCategory)
UserCategory.hasMany(UserItem)

List.belongsTo(User)
User.hasMany(List)

List.belongsToMany(UserItem, { through: ListItem})
UserItem.belongsToMany(List, { through: ListItem})

ItemBought.belongsTo(UserItem)
UserItem.hasMany(ItemBought)

ItemBought.belongsTo(User)
User.hasMany(ItemBought)


sequelize.sync(
    { alter: true }
    )
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))

app.listen(8080)
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

import sequelize from './util/database'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/items', itemsRoutes)
app.use('/categories', categoriesRoutes)
app.use('/auth', authRoutes)
app.use('/list', listRoutes)

Item.belongsTo(Category)
Category.hasMany(Item)

UserItem.belongsTo(User)
UserCategory.belongsTo(User)

UserItem.belongsTo(UserCategory)
UserCategory.hasMany(UserItem)

List.belongsTo(User)
User.hasMany(List)

List.belongsToMany(Item, { through: ListItem})
Item.belongsToMany(List, { through: ListItem})


sequelize.sync(
    { alter: true }
    )
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))

app.listen(8080)
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

import sequelize from './util/database'
import ListItem from './models/listItem'

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

List.belongsTo(User)
User.hasMany(List)

List.belongsToMany(Item, { through: ListItem})
Item.belongsToMany(List, { through: ListItem})

// ListItem.belongsTo(List)
// List.hasMany(ListItem)

// ListItem.belongsTo(Item)
// Item.hasMany(ListItem)


sequelize.sync(
    { alter: true }
    )
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))

app.listen(8080)
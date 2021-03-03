import express from 'express' 
import bodyParser from 'body-parser'
import itemsRoutes from './routes/items'
import categoriesRoutes from './routes/categories'

import sequelize from './util/database'

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/items', itemsRoutes)
app.use('/categories', categoriesRoutes)

sequelize.sync().then(result => {
    console.log(result)
}).catch(err => console.log(err))

app.listen(8080)
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const items_1 = __importDefault(require("./routes/items"));
const categories_1 = __importDefault(require("./routes/categories"));
const auth_1 = __importDefault(require("./routes/auth"));
const list_1 = __importDefault(require("./routes/list"));
const item_1 = __importDefault(require("./models/item"));
const category_1 = __importDefault(require("./models/category"));
const user_1 = __importDefault(require("./models/user"));
const list_2 = __importDefault(require("./models/list"));
const listItem_1 = __importDefault(require("./models/listItem"));
const userItem_1 = __importDefault(require("./models/userItem"));
const userCategory_1 = __importDefault(require("./models/userCategory"));
const itemBought_1 = __importDefault(require("./models/itemBought"));
const database_1 = __importDefault(require("./util/database"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const test = (req, res, next) => {
    res.send('Heyo');
};
app.use('/api/doo/', test);
app.use('/api/items', items_1.default);
app.use('/api/categories', categories_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/list', list_1.default);
item_1.default.belongsTo(category_1.default);
category_1.default.hasMany(item_1.default);
userItem_1.default.belongsTo(user_1.default);
userCategory_1.default.belongsTo(user_1.default);
userItem_1.default.belongsTo(userCategory_1.default);
userCategory_1.default.hasMany(userItem_1.default);
list_2.default.belongsTo(user_1.default);
user_1.default.hasMany(list_2.default);
list_2.default.belongsToMany(userItem_1.default, { through: listItem_1.default });
userItem_1.default.belongsToMany(list_2.default, { through: listItem_1.default });
itemBought_1.default.belongsTo(userItem_1.default);
userItem_1.default.hasMany(itemBought_1.default);
itemBought_1.default.belongsTo(user_1.default);
user_1.default.hasMany(itemBought_1.default);
database_1.default.sync({ alter: true })
    .then(result => {
    console.log(result);
})
    .catch(err => console.log(err));
app.listen(8080);

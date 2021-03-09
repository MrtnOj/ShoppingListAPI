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
const item_1 = __importDefault(require("./models/item"));
const category_1 = __importDefault(require("./models/category"));
const database_1 = __importDefault(require("./util/database"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/items', items_1.default);
app.use('/categories', categories_1.default);
app.use('/auth', auth_1.default);
item_1.default.belongsTo(category_1.default);
category_1.default.hasMany(item_1.default);
database_1.default.sync({ alter: true })
    .then(result => {
    console.log(result);
})
    .catch(err => console.log(err));
app.listen(8080);

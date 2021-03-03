"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('shoppinglist', 'postgres', '1', {
    dialect: 'postgres',
    host: 'localhost'
});
exports.default = sequelize;

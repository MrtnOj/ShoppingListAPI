"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants");
const sequelize = new sequelize_1.Sequelize('shoppinglist', constants_1.config.db.user, constants_1.config.db.password, {
    dialect: 'postgres',
    host: 'localhost'
});
exports.default = sequelize;

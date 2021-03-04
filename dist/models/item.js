"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../util/database"));
const category_1 = __importDefault(require("./category"));
const Item = database_1.default.define('item', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: category_1.default,
            key: 'id'
        }
    },
    lasts: {
        type: sequelize_1.DataTypes.INTEGER
    },
    last_bought: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.default = Item;

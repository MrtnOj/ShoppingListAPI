"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const database_1 = __importDefault(require("../util/database"));
class Item {
    constructor(id, name, categoryId, lasts, lastBought) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.lasts = lasts;
        this.lastBought = lastBought;
    }
    static fetchAll() {
        return database_1.default.query('SELECT * FROM items');
    }
}
exports.Item = Item;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = void 0;
const item_1 = require("../models/item");
const items = [
    { id: 1, name: 'Sitt', categoryId: 5 }
];
const getItems = (req, res, next) => {
    item_1.Item.fetchAll()
        .then((result) => {
        return res.status(200).json(result.rows);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getItems = getItems;

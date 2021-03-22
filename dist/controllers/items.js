"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = exports.getItems = void 0;
const item_1 = __importDefault(require("../models/item"));
const getItems = (req, res, next) => {
    item_1.default.findAll()
        .then(result => {
        res.json(result);
        console.log(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getItems = getItems;
const createItem = (req, res, next) => {
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const lasts = req.body.lasts;
    const lastBought = req.body.lastBought;
    item_1.default.create({
        name: name,
        categoryId: categoryId,
        lasts: lasts,
        last_bought: lastBought
    })
        .then(result => {
        res.send(result);
        console.log(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.createItem = createItem;

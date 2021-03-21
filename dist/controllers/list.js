"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveList = void 0;
const list_1 = __importDefault(require("../models/list"));
const listItem_1 = __importDefault(require("../models/listItem"));
const saveList = (req, res, next) => {
    const list = req.body.list;
    const userId = req.body.userId;
    if (list.length < 1) {
        return res.status(400).json({
            error: 'Empty list you fucknut'
        });
    }
    list_1.default.create({
        userId: userId
    })
        .then(result => {
        list.forEach((listItem) => {
            listItem_1.default.create({
                listId: result.id,
                itemId: listItem.id
            })
                .then(res => {
                console.log(res);
            });
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.saveList = saveList;

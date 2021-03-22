"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveList = exports.getListDetails = exports.getUserLists = void 0;
const list_1 = __importDefault(require("../models/list"));
const listItem_1 = __importDefault(require("../models/listItem"));
const item_1 = __importDefault(require("../models/item"));
const getUserLists = (req, res, next) => {
    const userId = req.params.userId;
    list_1.default.findAll({ where: { userId: userId } })
        .then(list => {
        return res.json(list);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getUserLists = getUserLists;
const getListDetails = (req, res, next) => {
    const listId = parseInt(req.params.listId);
    list_1.default.findOne({ where: { id: listId },
        include: {
            model: item_1.default
        }
    })
        .then(list => {
        return res.json(list);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getListDetails = getListDetails;
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

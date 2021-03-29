"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertIntoList = exports.deleteList = exports.saveList = exports.getListDetails = exports.getUserLists = void 0;
const list_1 = __importDefault(require("../models/list"));
const listItem_1 = __importDefault(require("../models/listItem"));
const item_1 = __importDefault(require("../models/item"));
const category_1 = __importDefault(require("../models/category"));
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
        res.json(list);
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
                .then(response => {
                console.log(res);
                res.json(response);
            })
                .catch(err => {
                console.log(err);
            });
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.saveList = saveList;
const deleteList = (req, res, next) => {
    const listId = parseInt(req.params.listId);
    list_1.default.destroy({ where: { id: listId } })
        .then(response => {
        res.json(response);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.deleteList = deleteList;
const insertIntoList = (req, res, next) => {
    const listId = parseInt(req.params.listId);
    const itemId = req.body.itemId;
    const itemName = req.body.name;
    const category = req.body.category;
    if (itemId) {
        listItem_1.default.create({
            listId: listId,
            itemId: itemId
        })
            .then(response => {
            res.send(response);
        })
            .catch(err => {
            console.log(err);
        });
    }
    else if (!itemId && category !== '') {
        category_1.default.findOne({ where: { name: category } })
            .then(cat => {
            if (cat) {
                item_1.default.create({
                    name: itemName,
                    categoryId: cat.get('id')
                })
                    .then(item => {
                    listItem_1.default.create({
                        listId: listId,
                        itemId: item.get('id')
                    })
                        .then(response => {
                        res.send(response);
                    });
                });
            }
            else {
                category_1.default.create({
                    name: category
                })
                    .then(category => {
                    item_1.default.create({
                        name: itemName,
                        categoryId: category.get('id')
                    })
                        .then(item => {
                        listItem_1.default.create({
                            listId: listId,
                            itemId: item.get('id')
                        })
                            .then(response => {
                            res.send(response);
                        });
                    });
                });
            }
        })
            .catch(err => {
            console.log(err);
        });
    }
    else if (!itemId && category === '') {
        item_1.default.create({
            name: itemName
        })
            .then(item => {
            listItem_1.default.create({
                listId: listId,
                itemId: item.get('id')
            })
                .then(response => {
                res.send(response);
            });
        });
    }
};
exports.insertIntoList = insertIntoList;

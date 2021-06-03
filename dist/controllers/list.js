"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeListName = exports.removeListItem = exports.insertIntoList = exports.deleteList = exports.saveList = exports.getListDetails = exports.getUserLists = void 0;
const list_1 = __importDefault(require("../models/list"));
const listItem_1 = __importDefault(require("../models/listItem"));
const userItem_1 = __importDefault(require("../models/userItem"));
const userCategory_1 = __importDefault(require("../models/userCategory"));
const getUserLists = (req, res, next) => {
    const userId = req.params.userId;
    if (userId !== req.userId) {
        return;
    }
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
    const userId = req.query.userId;
    if (userId !== req.userId) {
        return;
    }
    list_1.default.findOne({ where: { id: listId },
        include: {
            model: userItem_1.default
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
    if (userId !== req.userId) {
        return;
    }
    let result = 'List created successfully';
    if (list.length < 1) {
        return res.status(400).json({
            error: 'Empty list'
        });
    }
    list_1.default.create({
        userId: userId,
        name: list.name
    })
        .then((createdList) => {
        list.items.forEach((listItem) => {
            listItem_1.default.create({
                listId: createdList.id,
                userItemId: listItem.id,
                comment: listItem.comment
            })
                .then(response => {
                console.log(response);
            })
                .catch(err => {
                console.log(err);
                result = `Error saving list, item ID: ${listItem.id}`;
            });
        });
        res.json(createdList.id);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.saveList = saveList;
const deleteList = (req, res, next) => {
    const listId = parseInt(req.params.listId);
    const userId = req.query.userId;
    if (userId !== req.userId) {
        return;
    }
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
    const userId = req.body.userId;
    const itemName = req.body.name;
    const category = req.body.category;
    if (userId !== req.userId) {
        return;
    }
    if (itemId) {
        listItem_1.default.create({
            listId: listId,
            userItemId: itemId
        })
            .then(response => {
            res.send(response);
        })
            .catch(err => {
            console.log(err);
        });
    }
    else if (!itemId && category !== '') {
        userCategory_1.default.findOne({ where: { name: category } })
            .then(cat => {
            if (cat) {
                userItem_1.default.create({
                    name: itemName,
                    userCategoryId: cat.get('id')
                })
                    .then(item => {
                    listItem_1.default.create({
                        listId: listId,
                        userItemId: item.get('id')
                    })
                        .then(response => {
                        res.send(response);
                    });
                });
            }
            else {
                userCategory_1.default.create({
                    name: category
                })
                    .then(category => {
                    userItem_1.default.create({
                        name: itemName,
                        userCategoryId: category.get('id')
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
        userItem_1.default.create({
            name: itemName
        })
            .then(item => {
            listItem_1.default.create({
                listId: listId,
                userItemId: item.get('id')
            })
                .then(response => {
                res.send(response);
            });
        });
    }
};
exports.insertIntoList = insertIntoList;
const removeListItem = (req, res, next) => {
    const listItemId = req.params.listItemId;
    const userId = req.query.userId;
    if (userId !== req.userId) {
        return;
    }
    listItem_1.default.destroy({ where: { id: listItemId } })
        .then(response => {
        res.json(response);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.removeListItem = removeListItem;
const changeListName = (req, res, next) => {
    const newName = req.body.newName;
    const listId = req.params.listId;
    const userId = req.body.userId;
    if (userId !== req.userId) {
        return;
    }
    list_1.default.update({ name: newName }, { where: { id: listId } })
        .then(newList => {
        res.json(newList);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.changeListName = changeListName;

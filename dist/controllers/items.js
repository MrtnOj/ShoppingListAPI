"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserItem = exports.editUserItem = exports.createUserItem = exports.itemsBought = exports.getSuggestions = exports.getUserItems = exports.getItems = void 0;
const item_1 = __importDefault(require("../models/item"));
const userItem_1 = __importDefault(require("../models/userItem"));
const suggestionsCalculator_1 = __importDefault(require("../util/suggestionsCalculator"));
const itemBought_1 = __importDefault(require("../models/itemBought"));
const userCategory_1 = __importDefault(require("../models/userCategory"));
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
const getUserItems = (req, res, next) => {
    const userId = req.params.userId;
    userItem_1.default.findAll({ where: { userId: userId } })
        .then(result => {
        if (userId !== req.userId) {
            return Promise.reject('You are not authorized for this, fuck off m8');
        }
        res.json(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getUserItems = getUserItems;
const getSuggestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    let itemBuyHistory = [];
    yield userItem_1.default.findAll({ where: { userId: userId } })
        .then(items => {
        items.forEach(item => {
            itemBought_1.default.findAll({
                limit: 5,
                where: {
                    userItemId: item.id
                },
                order: [['bought', 'DESC']]
            })
                .then(boughtData => {
                if (boughtData) {
                    const buyDates = boughtData.map(data => data.bought);
                    itemBuyHistory.push({ item: item, boughtDates: buyDates });
                }
            })
                .catch(err => {
                console.log(err);
            });
        });
    })
        .catch(err => {
        console.log(err);
    });
    const filteredBuyHistory = itemBuyHistory.filter(item => item.boughtDates.length > 1);
    const suggestions = suggestionsCalculator_1.default(filteredBuyHistory);
    res.json(suggestions);
    // setTimeout(() => {
    //     const filteredBuyHistory = itemBuyHistory.filter(item => item.boughtDates.length > 1)
    //     const suggestions = suggestionsCalculator(filteredBuyHistory)
    //     res.json(suggestions)
    // }, 2000)
});
exports.getSuggestions = getSuggestions;
const itemsBought = (req, res, next) => {
    const items = req.body.items;
    const userId = req.body.userId;
    const date = new Date();
    let result = 'Bought dates updated';
    items.forEach((item) => {
        itemBought_1.default.create({
            userId: userId,
            userItemId: item.id,
            bought: date
        })
            .then(result => {
            console.log(`Item bought ID: ${item.id}`);
        })
            .catch(err => {
            console.log(err);
            result = `Updating failed for item with id ${item.id}`;
        });
    });
    res.send(result);
};
exports.itemsBought = itemsBought;
const createUserItem = (req, res, next) => {
    const userId = req.params.userId;
    const name = req.body.name;
    const categoryId = req.body.category.id;
    const categoryName = typeof (req.body.category === 'string') ? req.body.category : null;
    const lasts = req.body.lasts;
    if (categoryId) {
        userItem_1.default.create({
            name: name,
            userId: userId,
            userCategoryId: categoryId,
            lasts: lasts
        })
            .then(result => {
            res.send(result);
        })
            .catch(err => {
            console.log(err);
        });
    }
    else if (!categoryId && categoryName && categoryName !== '') {
        userCategory_1.default.create({
            name: categoryName,
            userId: userId
        })
            .then(category => {
            userItem_1.default.create({
                name: name,
                userId: userId,
                userCategoryId: category.get('id')
            })
                .then(result => {
                res.send(result);
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    else {
        userItem_1.default.create({
            name: name,
            userId: userId,
            lasts: lasts,
            userCategoryId: null
        })
            .then(result => {
            res.send(result);
        })
            .catch(err => {
            console.log(err);
        });
    }
};
exports.createUserItem = createUserItem;
const editUserItem = (req, res, next) => {
    const itemId = parseInt(req.params.itemId);
    const userId = req.body.userId;
    const newName = req.body.newName;
    const categoryId = req.body.category.id;
    const categoryName = typeof (req.body.category === 'string') ? req.body.category : null;
    if (categoryId) {
        userItem_1.default.update({ name: newName, userCategoryId: categoryId }, { where: { id: itemId } })
            .then(updatedItem => {
            res.json(updatedItem);
        })
            .catch(err => {
            console.log(err);
        });
    }
    else if (!categoryId && categoryName && categoryName !== '') {
        userCategory_1.default.create({
            name: categoryName,
            userId: userId
        })
            .then(category => {
            userItem_1.default.update({ name: newName, userCategoryId: category.get('id') }, { where: { id: itemId } })
                .then(result => {
                res.send(result);
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    else {
        userItem_1.default.update({ name: newName, userCategoryId: null }, { where: { id: itemId } })
            .then(updatedItem => {
            res.json(updatedItem);
        })
            .catch(err => {
            console.log(err);
        });
    }
};
exports.editUserItem = editUserItem;
const deleteUserItem = (req, res, next) => {
    const itemId = parseInt(req.params.itemId);
    userItem_1.default.destroy({ where: { id: itemId } })
        .then(response => {
        res.json(response);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.deleteUserItem = deleteUserItem;

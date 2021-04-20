"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserItem = exports.getSuggestions = exports.itemsBought = exports.getUserItems = exports.getItems = void 0;
const item_1 = __importDefault(require("../models/item"));
const userItem_1 = __importDefault(require("../models/userItem"));
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
        res.json(result);
        console.log(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getUserItems = getUserItems;
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
    // items.forEach((item: ItemInterface) => {
    //     UserItem.update({ lastBought: date }, { where: { id: item.id } })
    //     .then(result => {
    //         console.log(`Updated successfully item id: ${item.id}`)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         result = `Updating failed for item with id ${item.id}`
    //     })
    // })
    res.send(result);
};
exports.itemsBought = itemsBought;
const getSuggestions = (req, res, next) => {
    const userId = req.body.userId;
    const date = new Date();
    let itemBuyHistory = [];
    userItem_1.default.findAll({ where: { userId: userId } })
        .then(items => {
        items.forEach(item => {
            itemBought_1.default.findAll({
                // limit: 5,
                where: {
                    userItemId: item.id
                },
                order: [['bought', 'DESC']]
            })
                .then(boughtData => {
                if (boughtData) {
                    const buyDates = boughtData.map(data => data.bought);
                    console.log(buyDates);
                    itemBuyHistory.push({ id: item.id, boughtDates: buyDates });
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
    res.json(itemBuyHistory);
};
exports.getSuggestions = getSuggestions;
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

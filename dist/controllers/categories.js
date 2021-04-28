"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserCategory = exports.editUserCategory = exports.createUserCategory = exports.createCategory = exports.getUserCategories = exports.getCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
const userCategory_1 = __importDefault(require("../models/userCategory"));
const getCategories = (req, res, next) => {
    category_1.default.findAll()
        .then(result => {
        res.json(result);
        console.log(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getCategories = getCategories;
const getUserCategories = (req, res, next) => {
    const userId = req.params.userId;
    userCategory_1.default.findAll({ where: { userId: userId } })
        .then(result => {
        res.json(result);
        console.log(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getUserCategories = getUserCategories;
const createCategory = (req, res, next) => {
    const name = req.body.name;
    category_1.default.create({
        name: name,
    })
        .then(result => {
        res.send(result);
        console.log(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.createCategory = createCategory;
const createUserCategory = (req, res, next) => {
    const userId = req.params.userId;
    const name = req.body.name;
    userCategory_1.default.create({
        name: name,
        userId: userId
    })
        .then(result => {
        res.json(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.createUserCategory = createUserCategory;
const editUserCategory = (req, res, next) => {
    const categoryId = parseInt(req.params.categoryId);
    const newName = req.body.newCategoryName;
    userCategory_1.default.update({ name: newName }, { where: { id: categoryId } })
        .then(newCategory => {
        res.json(newCategory);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.editUserCategory = editUserCategory;
const deleteUserCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    userCategory_1.default.destroy({ where: { id: categoryId } })
        .then(result => {
        res.json(result);
    })
        .catch(err => {
        console.log(err);
    });
};
exports.deleteUserCategory = deleteUserCategory;

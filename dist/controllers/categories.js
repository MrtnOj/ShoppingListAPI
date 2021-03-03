"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
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

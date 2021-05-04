"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const categories_1 = require("../controllers/categories");
const router = express_1.Router();
router.get('/', categories_1.getCategories);
router.get('/:userId', is_auth_1.default, categories_1.getUserCategories);
router.post('/', is_auth_1.default, categories_1.createCategory);
router.post('/:userId', is_auth_1.default, categories_1.createUserCategory);
router.put('/:categoryId', is_auth_1.default, categories_1.editUserCategory);
router.delete('/:categoryId', is_auth_1.default, categories_1.deleteUserCategory);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const items_1 = require("../controllers/items");
const router = express_1.Router();
router.get('/', items_1.getItems);
router.post('/:userId', is_auth_1.default, items_1.createUserItem);
router.delete('/:itemId', is_auth_1.default, items_1.deleteUserItem);
router.put('/:itemId', is_auth_1.default, items_1.editUserItem);
router.post('/bought', items_1.itemsBought);
router.get('/suggestions/:userId', is_auth_1.default, items_1.getSuggestions);
router.get('/:userId', is_auth_1.default, items_1.getUserItems);
exports.default = router;

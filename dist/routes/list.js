"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_1 = require("../controllers/list");
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const router = express_1.Router();
router.get('/:userId', is_auth_1.default, list_1.getUserLists);
router.get('/listdetails/:listId', is_auth_1.default, list_1.getListDetails);
router.post('/add/:listId', is_auth_1.default, list_1.insertIntoList);
router.delete('/listitem/delete/:listItemId', is_auth_1.default, list_1.removeListItem);
router.delete('/delete/:listId', is_auth_1.default, list_1.deleteList);
router.put('/update/', is_auth_1.default, list_1.updateList);
router.put('/:listId', is_auth_1.default, list_1.changeListName);
router.post('/', is_auth_1.default, list_1.saveList);
exports.default = router;

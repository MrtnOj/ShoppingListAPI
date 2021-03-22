"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_1 = require("../controllers/list");
const router = express_1.Router();
router.get('/:userId', list_1.getUserLists);
router.get('/listdetails/:listId', list_1.getListDetails);
router.post('/', list_1.saveList);
exports.default = router;

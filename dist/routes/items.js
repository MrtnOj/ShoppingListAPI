"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_1 = require("../controllers/items");
const router = express_1.Router();
router.get('/', items_1.getItems);
router.post('/:userId', items_1.createUserItem);
router.get('/:userId', items_1.getUserItems);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_1 = require("../controllers/items");
const router = express_1.Router();
router.get('/', items_1.getItems);
router.post('/', items_1.createItem);
exports.default = router;

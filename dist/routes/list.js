"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_1 = require("../controllers/list");
const router = express_1.Router();
router.post('/', list_1.saveList);
exports.default = router;

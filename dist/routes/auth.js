"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const user_1 = __importDefault(require("../models/user"));
const router = express_1.Router();
router.post('/signup', express_validator_1.body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(value => {
    user_1.default.findOne({ where: { email: value } })
        .then(user => {
        if (user) {
            return Promise.reject('Email address already exists');
            // throw error for handling
        }
    });
})
    .withMessage('Email address already exists')
    .normalizeEmail(), auth_1.signUp);
exports.default = router;

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
router.post('/signup', [
    express_validator_1.body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(value => {
        return user_1.default.findOne({ where: { email: value } })
            .then(user => {
            console.log(user);
            if (user) {
                return Promise.reject('Email address already exists');
                // throw error for handling
            }
        });
    })
        .withMessage('Email address already exists')
        .normalizeEmail(),
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters.'),
    express_validator_1.body('confirmPassword')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation doesn\'t match');
        }
        return true;
    })
], auth_1.signUp);
router.post('/login', auth_1.logIn);
exports.default = router;

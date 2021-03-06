"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const signUp = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        return res.status(400).json({
            error: errors.array()[0].msg
        });
        // const error = new Error(errors.array()[0].msg);
        // console.log(error)
        // throw error;
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcryptjs_1.default
        .hash(password, 12)
        .then(hashedPw => {
        user_1.default.create({
            username: username,
            email: email,
            password: hashedPw
        })
            .then(result => {
            res.send(result);
            console.log(result);
        })
            .catch(err => {
            console.log(err);
        });
    })
        .then(result => {
        return res.status(201).json({ message: 'User created! You can now log in', result });
    })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.signUp = signUp;
const logIn = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
};
exports.logIn = logIn;

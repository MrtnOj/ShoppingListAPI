"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signUp = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
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
            // res.send(result)
            console.log(result.username);
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
    let loadedUser;
    user_1.default.findOne({ where: { username: username } })
        .then((user) => {
        if (!user) {
            return Promise.reject('No such user you dumb fuck');
        }
        loadedUser = user;
        return bcryptjs_1.default.compare(password, user.password);
    })
        .then(isEqual => {
        if (!isEqual) {
            return Promise.reject('Wrong password fuckin daft toad');
        }
        const token = jsonwebtoken_1.default.sign({
            username: loadedUser === null || loadedUser === void 0 ? void 0 : loadedUser.username,
            userId: loadedUser === null || loadedUser === void 0 ? void 0 : loadedUser.id.toString()
        }, 'Theguywasaninteriordecorator,killed16czechoslovakians');
        return res.status(200).json({ token: token, userId: loadedUser === null || loadedUser === void 0 ? void 0 : loadedUser.id.toString(), username: loadedUser === null || loadedUser === void 0 ? void 0 : loadedUser.username });
    })
        .catch(err => {
        return res.status(400).json({ error: err });
        next(err);
    });
};
exports.logIn = logIn;

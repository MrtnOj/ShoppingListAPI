"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'Theguywasaninteriordecorator,killed16czechoslovakians');
    }
    catch (err) {
        err.statusCode = 403;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
exports.default = isAuth;

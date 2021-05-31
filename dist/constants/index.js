"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const prod = {
    db: {
        user: 'ubuntu',
        password: 'Minjipptvopdvue19'
    }
};
const dev = {
    db: {
        user: 'postgres',
        password: '1'
    }
};
exports.config = dev; // process.env.NODE_ENV === 'development' ? dev : prod;

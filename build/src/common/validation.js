"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginUserSchema = exports.userCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userCreateSchema = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(20).required(),
    last_name: joi_1.default.string().min(3).max(20).required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi_1.default.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    confirmPassword: joi_1.default.ref('password'),
    age: joi_1.default.number().min(3),
    city: joi_1.default.string().min(3).max(10),
    state: joi_1.default.string().min(3).max(30)
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi_1.default.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
});
exports.resetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi_1.default.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    confirmPassword: joi_1.default.ref('password')
});
exports.updateSchema = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(20),
    last_name: joi_1.default.string().min(3).max(20),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    age: joi_1.default.number().min(3),
    city: joi_1.default.string().min(3).max(10),
    state: joi_1.default.string().min(3).max(30)
});

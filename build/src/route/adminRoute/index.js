"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adminroute = void 0;
const express_1 = __importDefault(require("express"));
const post_1 = require("./post");
const Adminroute = express_1.default.Router();
exports.Adminroute = Adminroute;
Adminroute.post("/adminSignup", post_1.adminSignup);

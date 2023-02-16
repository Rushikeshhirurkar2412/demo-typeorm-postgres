"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
//import { createUser } from "./signup";
const loginUser_1 = __importDefault(require("./loginUser"));
const signup_1 = require("./signup");
const read_1 = require("./read");
const route = express_1.default.Router();
exports.route = route;
route.post("/api/login", loginUser_1.default); //login user
route.post("/api/signup", signup_1.createWithRelation); //signUp user
route.get("/api/:id", read_1.getDataUSer); // get user

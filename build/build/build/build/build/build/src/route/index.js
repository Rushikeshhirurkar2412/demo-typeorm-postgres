"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const create_1 = require("./create");
const read_1 = require("./read");
//import { patchDataUSer } from "./update";
const route = express_1.default.Router();
exports.route = route;
route.post("/api/signup", create_1.createUser); //signUp user
route.get("/api/:id", read_1.getDataUSer); // get user

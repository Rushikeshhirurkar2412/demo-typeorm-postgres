"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_1 = require("./create");
//import { patchDataUSer } from "./update";
const route = express_1.default.Router();
route.post("/api/product", create_1.createProduct); //signUp user

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_category_1 = require("./create_category");
const categoryRoute = express_1.default.Router();
categoryRoute.post("/api/product", create_category_1.create_category); //signUp user
// route.get("/api/:id",getDataUSer)// get user
exports.default = categoryRoute;

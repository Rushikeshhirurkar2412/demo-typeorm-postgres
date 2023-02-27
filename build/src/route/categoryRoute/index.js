"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_admin_1 = require("../../middleware/authenticate-admin");
const create_category_1 = require("./create_category");
const get_Category_1 = require("./get_Category");
const categoryRoute = express_1.default.Router();
categoryRoute.post("/api/createCategory", authenticate_admin_1.authenticateAdmin, create_category_1.create_category); //signUp user
categoryRoute.get("/api/category/:id", authenticate_admin_1.authenticateAdmin, get_Category_1.getCategory); //get user
// route.get("/api/:id",getDataUSer)// get user
exports.default = categoryRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
//import { authenticateAdmin } from "../../middleware/authenticate-admin";
//import { createUser } from "./signup";
const post_1 = require("./post");
const read_1 = require("./read");
const update_1 = require("./update");
const route = express_1.default.Router();
exports.route = route;
const delete_1 = __importDefault(require("./delete"));
route.post("/signup", post_1.createWithRelation); //signUp user
route.post("/login", post_1.loginUser); //login user
route.post("/forgotPassword", post_1.forgotPassword); // forgotPassword
route.post("/resetPassword/?", post_1.resetPassword); // resetPassword
route.get("/:id", read_1.getDataUSer); // get user
route.put("/updateUSer/:id", update_1.updateUser); //update user details
route.delete("/delete/:id", delete_1.default); //delete user

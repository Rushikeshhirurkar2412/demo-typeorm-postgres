"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const bcrypt = require("bcryptjs");
const user_1 = require("../../entities/user");
const validation_1 = require("../../validation");
var jwt = require("jsonwebtoken");
dotenv.config();
//create secretKey in jwt
let secretKey = process.env.SECRET_KEY;
let loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.loginUserSchema.validateAsync(req.body);
        let { email, password } = req.body;
        let isAvailable = yield user_1.User.findOneBy({ email: email });
        if (!isAvailable) {
            return res
                .status(400)
                .json({ message: "👎🏻 User does not exist !!!!, please signup " });
        }
        let comparePassword = yield bcrypt.compareSync(password, isAvailable.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "👎🏻 incorrect password " });
        }
        let tokenPayload = {
            id: isAvailable.id,
            email: isAvailable.email,
        };
        let token = yield jwt.sign({ tokenPayload }, secretKey, {
            expiresIn: "300s",
        });
        console.log("token :" + token);
        res.status(200).json({ message: "👍🏼 user login successfully ", token });
    }
    catch (error) {
        res.json({ message: "👎🏻 something went wrong " + error });
    }
});
exports.default = loginUser;

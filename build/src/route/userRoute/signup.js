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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.createWithRelation = void 0;
const dotenv = __importStar(require("dotenv"));
const bcrypt = require("bcryptjs");
const user_1 = require("../../entities/user");
const user_session_1 = require("../../entities/user_session");
const validation_1 = require("../../common/validation");
const user_details_1 = require("../../entities/user_details");
const common_function_1 = require("../../common/common-function");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_2 = require("../../common/validation");
const common_function_2 = require("../../common/common-function");
dotenv.config();
//create secretKey in jwt
let secretKey = process.env.SECRET_KEY;
// //const jwt = require('jsonwebtoken');
// import { User_details } from "../../entities/user_details";
// import { User } from "../../entities/user";
//register user
const createWithRelation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_2.userCreateSchema.validateAsync(req.body);
        let { first_name, lname_name, email, password, age, city, state } = req.body;
        let isAvailable = yield user_1.User.findOneBy({ email: email });
        if (isAvailable) {
            return res.status(400).json({ message: " User already exist" });
        }
        let timestamp = new Date();
        let hashPassword = (0, common_function_2.HashSyncPassword)(password);
        const userQuery = yield new user_1.User();
        userQuery.first_name = first_name;
        userQuery.lname_name = lname_name;
        userQuery.email = email;
        userQuery.password = hashPassword;
        userQuery.created_by = email;
        userQuery.created_at = timestamp;
        const userSave = yield user_1.User.save(userQuery);
        let detailsQuery = yield new user_details_1.User_details();
        detailsQuery.age = age;
        detailsQuery.city = city;
        detailsQuery.state = state;
        detailsQuery.user = userQuery;
        detailsQuery.created_by = email;
        detailsQuery.created_at = timestamp;
        const datailsSave = yield user_details_1.User_details.save(detailsQuery);
        console.log("user has been created", userQuery, detailsQuery);
        res.status(200).json({ message: "user has been created" });
    }
    catch (error) {
        res.json({ message: "👎🏻 something went wrong " + error });
    }
});
exports.createWithRelation = createWithRelation;
// login user
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
        let comparePassword = (0, common_function_1.compareSynchPassword)(password, isAvailable.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "👎🏻 incorrect password " });
        }
        let tokenPayload = {
            id: isAvailable.id,
            email: isAvailable.email,
        };
        let token = yield jsonwebtoken_1.default.sign({ tokenPayload }, secretKey, {
            expiresIn: "300000s",
        });
        console.log(token);
        let findSession = yield user_session_1.user_session.find({
            where: { user_id: { id: isAvailable.id } },
            relations: ["user_id"],
        });
        let timestamp = new Date();
        if (!findSession) {
            let newUserToken = yield user_session_1.user_session.insert({
                token: token,
                user_id: isAvailable,
                is_expired: false,
                created_at: timestamp,
            });
            console.log(token);
            return res
                .status(200)
                .json({ message: "👍🏼 user login successfully ", token });
        }
        else {
            let findToken = yield user_session_1.user_session.update({ user_id: { id: isAvailable.id } }, { is_expired: true });
            let insertToken = yield user_session_1.user_session.insert({
                token: token,
                user_id: isAvailable,
                is_expired: false,
                created_at: timestamp,
            });
            console.log(token);
            return res
                .status(200)
                .json({ message: "👍🏼 user login successfully ", token });
        }
        //let tokenUpdate=await user_session.update({id:isAvailable.id},{is_expired:true})
    }
    catch (error) {
        res.json({ message: "👎🏻 something went wrong " + error });
    }
});
exports.default = loginUser;
//forgot password
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_2.forgotPasswordSchema.validateAsync(req.body);
        let { email } = req.body;
        let isAvailable = yield user_1.User.findOneBy({ email: email });
        if (!isAvailable) {
            return res
                .status(400)
                .json({ message: "user not exist . please signup" });
        }
        let tokenPayload = {
            id: isAvailable.id,
            email: isAvailable.email,
        };
        let getjwtf = (data) => {
            return jsonwebtoken_1.default.sign({ tokenPayload }, secretKey, {
                expiresIn: "30000000s",
            });
        };
        let token = getjwtf(tokenPayload);
        console.log("token :" + token);
        // let timestamp = new Date();
        // let insertToken = await user_session.insert({
        //   token: token,
        //   user_id: isAvailable,
        //   is_expired: false,
        //   created_at: timestamp,
        // });
        res.status(200).json({ message: "link send on email" });
        // const tokenData = (token).tokenData as ITokenData;
        // console.log(tokenData.email);
    }
    catch (error) {
        res.json({ message: "👎🏻 something went wrong " + error });
    }
});
exports.forgotPassword = forgotPassword;
//reset password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_2.resetPasswordSchema.validateAsync(req.body);
        let { password } = req.body;
        console.log(password);
        const headerToken = req.headers;
        const token = headerToken.authorization;
        let decoded = jsonwebtoken_1.default.verify(token, secretKey);
        let tokenDecode = decoded.tokenPayload.id;
        console.log(tokenDecode);
        //  let findToken=await user_session.update({user_id:{id:isAvailable.id}},{is_expired:true})
        let hashPassword = (0, common_function_2.HashSyncPassword)(password);
        let updatePass = yield user_1.User.update(tokenDecode, { password: hashPassword });
        console.log(updatePass);
        res.status(200).json({ message: "password changed successfully" });
    }
    catch (error) {
        res.json({ message: "👎🏻 something went wrong " + error });
    }
});
exports.resetPassword = resetPassword;

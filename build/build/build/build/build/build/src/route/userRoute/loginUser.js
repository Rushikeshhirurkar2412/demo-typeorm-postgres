"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcryptjs');
const user_1 = require("../../entities/user");
const validation_1 = require("../../validation");
let loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.loginUserSchema.validateAsync(req.body);
        let { email, password } = req.body;
        let isAvailable = yield user_1.User.findOneBy({ email: email });
        if (!isAvailable) {
            return res.status(400).json({ message: "👎🏻 User does not exist !!!!, please signup " });
        }
        let comparePassword = yield bcrypt.compareSync(password, isAvailable.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "👎🏻 incorrect password " });
        }
        res.status(200).json({ message: "👍🏼 user login successfully " });
    }
    catch (error) {
        res.json({ message: "👎🏻 something went wrong " + error });
    }
});
exports.default = loginUser;

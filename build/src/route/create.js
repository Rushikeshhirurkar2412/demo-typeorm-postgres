"use strict";
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
exports.createUser = void 0;
const user_1 = require("../entities/user");
// import { Product } from "../entity/product";
// import { category } from "../entity/category";
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { fname, lname, email, passwoerd, age, city, state } = req.body;
        let isAvailable = yield user_1.User.findOneBy({ email: email });
        if (isAvailable) {
            res.status(400).json({ message: "User already exist" });
        }
        let query = yield user_1.User.insert({ fname: fname,
            lname: lname,
            email: email,
            passwoerd: passwoerd,
            age: age,
            city: city,
            state: state });
        console.log("user has been created", query);
        res.status(200).json({ message: "user has been created" });
    }
    catch (error) {
        res.json({ message: "something went wrong " + error });
    }
});
exports.createUser = createUser;

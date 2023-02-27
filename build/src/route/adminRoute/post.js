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
exports.adminSignup = void 0;
const common_function_1 = require("../../common/common-function");
const validation_1 = require("../../common/validation");
const user_1 = require("../../entities/user");
const user_details_1 = require("../../entities/user_details");
//register user
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.userCreateSchema.validateAsync(req.body);
        let { first_name, last_name, email, password, age, city, state } = req.body;
        let isAvailable = yield user_1.User.findOneBy({ email: email });
        if (isAvailable) {
            return res.status(400).json({ message: " User already exist" });
        }
        let timestamp = new Date();
        let hashPassword = (0, common_function_1.HashSyncPassword)(password);
        const userQuery = yield new user_1.User();
        userQuery.first_name = first_name;
        userQuery.last_name = last_name;
        userQuery.email = email;
        userQuery.password = hashPassword;
        userQuery.created_by = email;
        userQuery.created_at = timestamp;
        userQuery.role = user_1.role.SUPER_ADMIN;
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
exports.adminSignup = adminSignup;

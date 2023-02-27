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
exports.updateUser = void 0;
const validation_1 = require("../../common/validation");
const user_1 = require("../../entities/user");
const user_details_1 = require("../../entities/user_details");
let updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.updateSchema.validateAsync(req.body);
        let { first_name, last_name, city, state, age } = req.body;
        let { id } = req.params;
        let isAvailable = yield user_1.User.findOneBy({ id: id });
        if (!isAvailable) {
            res.status(400).send({ message: "user not found" });
        }
        let timestamp = new Date();
        let userUpdate = yield user_1.User.update({ id: isAvailable.id }, {
            first_name,
            last_name,
            updated_by: isAvailable.email,
            updated_at: timestamp,
        });
        let userDetailsAvailable = yield user_details_1.User_details.findOneBy({
            user: { id: isAvailable.id },
        });
        let updateDetails = yield user_details_1.User_details.update({ id: userDetailsAvailable.id }, { age, city, state, updated_at: timestamp, updated_by: isAvailable.email });
        console.log(updateDetails);
        res.status(200).send({ message: "user update successfully" });
    }
    catch (error) {
        res.status(400).send({ message: "something went wrong", error });
    }
});
exports.updateUser = updateUser;

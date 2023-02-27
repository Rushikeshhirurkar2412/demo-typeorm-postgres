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
exports.getDataUSer = void 0;
const user_details_1 = require("../../entities/user_details");
const getDataUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let getData = yield user_details_1.User_details.find({
            where: { user: { id: id } },
            relations: ["user"],
        });
        if (getData.length === 0) {
            return res.status(400).json({ message: "id is not found." });
        }
        res.status(200).json({ message: getData });
        console.log(getData);
    }
    catch (error) {
        res.json({ message: "something went wrong", error });
    }
});
exports.getDataUSer = getDataUSer;

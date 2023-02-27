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
exports.getCategory = void 0;
const category_1 = require("../../entities/category");
let secretKey = process.env.SECRET_KEY;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.body;
        let findCategory = yield category_1.category.find({ where: { id: id } });
        console.log(findCategory);
        res.send(findCategory);
    }
    catch (error) {
        res.send(error);
    }
});
exports.getCategory = getCategory;

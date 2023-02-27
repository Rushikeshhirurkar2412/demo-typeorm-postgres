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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_category = void 0;
const status_codes_1 = require("http-status-codes/build/cjs/status-codes");
const category_1 = require("../../entities/category");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let secretKey = process.env.SECRET_KEY;
const create_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { category_name, parent_category_id } = req.body;
        let { authorization } = req.headers;
        let decodeToken = yield jsonwebtoken_1.default.verify(authorization, secretKey);
        let payloadId = decodeToken.tokenPayload.id;
        let categoryAvalaible = yield category_1.category.findOneBy({
            category_name: category_name,
        });
        if (categoryAvalaible) {
            return res
                .status(status_codes_1.StatusCodes.BAD_REQUEST)
                .send("this category already exist.");
        }
        let timestemp = new Date();
        let createCategory = new category_1.category();
        createCategory.category_name = category_name;
        createCategory.parent_category_id = parent_category_id;
        createCategory.created_at = timestemp;
        createCategory.created_by = payloadId;
        let saveCategory = yield category_1.category.save(createCategory);
        res.status(status_codes_1.StatusCodes.OK).send("category has been inserted");
    }
    catch (error) {
        res.json({ message: "👎🏻 something went wrong " + error });
    }
});
exports.create_category = create_category;

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
const express_1 = __importDefault(require("express"));
// import * as dotenv from "dotenv"
const body_parser_1 = __importDefault(require("body-parser"));
// import { route } from "./src/route";
const my_app_data_source_1 = __importDefault(require("./src/my-app-data-source"));
let port = process.env.PORT || 4501;
//dotenv.config()
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//database connection
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield my_app_data_source_1.default.initialize();
        if (db) {
            console.log(`⚡️ server started with 👍🏼 database connected http://localhost:${port} in `);
            app.listen(port, () => {
                console.log(`⚡️ server started with 👍🏼 database connected http://localhost:${port} in `);
            });
        }
    }
    catch (error) {
        console.log(`👎🏻 database or redis connection has some problem : ${error}`);
    }
}))();
// this is middleware for CRUD
// app.use("/", route);
// url: process.env.DATABASE_URL,

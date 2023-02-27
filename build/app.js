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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const my_app_data_source_1 = __importDefault(require("./src/my-app-data-source"));
const userRoute_1 = require("./src/route/userRoute");
const productRoute_1 = __importDefault(require("./src/route/productRoute"));
const adminRoute_1 = require("./src/route/adminRoute");
const categoryRoute_1 = __importDefault(require("./src/route/categoryRoute"));
let port = process.env.PORT || 4501;
dotenv.config();
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
app.use("/api", userRoute_1.route);
app.use("/api", productRoute_1.default);
app.use("/api", adminRoute_1.Adminroute);
app.use("/", categoryRoute_1.default);
// url: process.env.DATABASE_URL,

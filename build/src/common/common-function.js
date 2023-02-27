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
exports.Send_mail_user = exports.compareSynchPassword = exports.HashSyncPassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
let port = process.env.PORT || 4501;
function HashSyncPassword(password) {
    return bcrypt.hashSync(password, salt);
}
exports.HashSyncPassword = HashSyncPassword;
function compareSynchPassword(password, isAvailablePassword) {
    return bcrypt.compareSync(password, isAvailablePassword);
}
exports.compareSynchPassword = compareSynchPassword;
let Send_mail_user = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer_1.default.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    let send_mail = yield transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "User_Forgot_Password_Verification_Link",
        html: `<h1> this is your Forgot Password Verification Link </h1> <h5> http://localhost:${port}/api/resetPassword/?token=${token}</h5> `
    });
    console.log("Message sent: %s", send_mail.messageId);
    console.log("mail send: ", send_mail);
});
exports.Send_mail_user = Send_mail_user;

import express from "express";
import { adminSignup } from "./post";
const Adminroute = express.Router()

Adminroute.post("/adminSignup",adminSignup)

export { Adminroute };
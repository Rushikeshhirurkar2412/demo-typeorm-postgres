import express from "express";
//import { authenticateAdmin } from "../../middleware/authenticate-admin";
//import { createUser } from "./signup";

import {
  createWithRelation,
  forgotPassword,
  loginUser,
  resetPassword,
} from "./post";
import { getDataUSer } from "./read";
import { updateUser } from "./update";

const route = express.Router();

import deleteDataUSer from "./delete";

route.post("/signup", createWithRelation); //signUp user

route.post("/login", loginUser); //login user

route.post("/forgotPassword", forgotPassword); // forgotPassword

route.post("/resetPassword/?", resetPassword); // resetPassword

route.get("/:id", getDataUSer); // get user

route.put("/updateUSer/:id", updateUser); //update user details

route.delete("/delete/:id", deleteDataUSer); //delete user


export { route };

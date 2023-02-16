import express from "express";
//import { createUser } from "./signup";
import loginUser from "./loginUser";
import { createWithRelation } from "./signup";
import { getDataUSer } from "./read";


const route = express.Router()



route.post("/api/login",loginUser)//login user


route.post("/api/signup",createWithRelation)//signUp user


route.get("/api/:id",getDataUSer)// get user




























































































//route.post("/api/signup",createUser)


// import deleteDataUSer from "./delete";

//import { patchDataUSer } from "./update";


//route.put("/api//update/:id",patchDataUSer)//update user details

// route.delete("/api/:id",deleteDataUSer)//delete user




export { route };
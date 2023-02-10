import express from "express";
import { createUser } from "./signup";
import loginUser from "./loginUser";



const route = express.Router()

route.post("/api/signup",createUser)//signUp user

route.post("/api/login",loginUser)//login user































































































// import { getDataUSer } from "./read";

//route.get("/api/:id",getDataUSer)// get user


// import deleteDataUSer from "./delete";

//import { patchDataUSer } from "./update";


//route.put("/api//update/:id",patchDataUSer)//update user details

// route.delete("/api/:id",deleteDataUSer)//delete user




export { route };
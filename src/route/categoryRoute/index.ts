import express from "express";
import { authenticateAdmin } from "../../middleware/authenticate-admin";
import { create_category } from "./create_category";
import { getCategory } from "./get_Category";

const categoryRoute = express.Router()

categoryRoute.post("/api/createCategory",authenticateAdmin,create_category)//signUp user
categoryRoute.get("/api/category/:id",authenticateAdmin,getCategory)//get user



// route.get("/api/:id",getDataUSer)// get user


export default  categoryRoute
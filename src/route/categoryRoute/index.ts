import express from "express";
import { create_category } from "./create_category";

const categoryRoute = express.Router()

categoryRoute.post("/api/product",create_category)//signUp user

// route.get("/api/:id",getDataUSer)// get user


export default  categoryRoute
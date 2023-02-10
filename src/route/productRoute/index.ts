import express from "express";
import { createProduct } from "./create";
//import { patchDataUSer } from "./update";

const route = express.Router()

route.post("/api/product",createProduct)//signUp user

// route.get("/api/:id",getDataUSer)// get user



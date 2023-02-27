import express from "express";
import { createProduct } from "./create";
//import { patchDataUSer } from "./update";

const Productroute = express.Router()

Productroute.post("/api/product",createProduct)//signUp user

// route.get("/api/:id",getDataUSer)// get user


export default  Productroute
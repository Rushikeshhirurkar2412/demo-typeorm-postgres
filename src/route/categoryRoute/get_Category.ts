import {Request,Response} from "express";

import { category } from "../../entities/category";
import jwt from "jsonwebtoken";
let secretKey = process.env.SECRET_KEY;

export const getCategory=async(req:Request,res:Response)=>{try {
   
    let{id}:any=req.body
    

let findCategory= await category.find({where:{id:id}})
console.log(findCategory);
res.send(findCategory)

} catch (error) {
    res.send(error)
}

}
import { Request,Response} from "express";
import { User } from "../../entities/user";
import { userCreateSchema } from "../../validation";
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// console.log(salt);


export const createUser=async(req:Request,res:Response)=>{
    try {
        
        await userCreateSchema.validateAsync(req.body)

        let {fname,lname,email,password,age,city,state}=req.body


        let isAvailable= await User.findOneBy({email:email})

        if (isAvailable) {
          return  res.status(400).json({message:" User already exist"})
        }
        let hashPassword = bcrypt.hashSync(password, salt);
        
        
        //insert user
        let query=await User.insert(
        {fname:fname,
        lname:lname,
        email:email,
        password:hashPassword,
        age:age,
        city:city,
        state:state})
        
        console.log("user has been created",query);
res.status(200).json({message:"user has been created"})

        
    } catch (error) {
        res.json({message:"👎🏻 something went wrong " + error})
    }
}

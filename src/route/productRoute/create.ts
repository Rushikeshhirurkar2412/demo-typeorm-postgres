import { Request,Response} from "express";
import { Product } from "../../entities/product";

export const createProduct=async(req:Request,res:Response)=>{
    try {
        let {Product_name,description}=req.body

        // let isAvailable= await User.findOneBy({email:email})

        // if (isAvailable) {
        //     res.status(400).json({message:"User already exist"})
        // }
    
        let query=await Product.insert(
        {Product_name:Product_name,
            description:description})
        
        console.log("Product has been created",query);
res.status(200).json({message:"user has been created"})

        
    } catch (error) {
        res.json({message:"something went wrong " + error})
    }
}

import { Request,Response} from "express";
import { User } from "../../entities/user";


export const getDataUSer=async(req:Request,res:Response)=>{
try {
    let {id}:any=req.params

    let getData=await User.findOneBy({id:id})
    res.json({message:getData})
    console.log(getData);
    

} catch (error) {
    res.json({message:"something went wrong",error})
}

}
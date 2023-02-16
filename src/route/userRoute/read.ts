import { Request,Response} from "express";
import { User_details } from "../../entities/details";
import { User } from "../../entities/user";


export const getDataUSer=async(req:Request,res:Response)=>{
try {
    let {id}:any=req.params

let getData=await User.find({where:{id:id},
   relations:["UserDetails"]
})


if (getData.length===0) {
    return res.status(400).json({message:"id is not found."})
 }
 
    res.status(200).json({message:getData})
    console.log(getData);

} catch (error) {
    res.json({message:"something went wrong",error})
}

}
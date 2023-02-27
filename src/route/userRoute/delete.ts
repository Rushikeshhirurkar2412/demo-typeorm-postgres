    import { time } from 'console';
import {Request,Response} from 'express';
import { User } from '../../entities/user';
import { User_details } from '../../entities/user_details';
import { user_session } from '../../entities/user_session';
   
    let deleteDataUSer=async(req:Request,res:Response)=>{
try {
    let {id}:any=req.params;

    let isAvailable= await User.findOneBy({id:id})
    console.log(isAvailable);
      
    if (!isAvailable) {
        res.status(400).send("user not found.")
    }
let timestamp=new Date()
    let idDelete= await User.update({id:id},{
        is_deleted:true,
        deleted_by:isAvailable.email,
        deleted_at:timestamp
    })

    let detailsDeleted= await User_details.update({user:{id:isAvailable.id}},{deleted_at:timestamp,deleted_by:isAvailable.email})

    let deleteSession=await user_session.update({user_id:{id:id}},{deleted_at:timestamp})

    res.json({message: id +" no. id is user deleted "})

    

} catch (error) {
    
}
    }


export default deleteDataUSer
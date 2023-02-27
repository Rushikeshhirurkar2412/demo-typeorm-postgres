import  nodemailer from "nodemailer";
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
let port = process.env.PORT || 4501;

export function HashSyncPassword (password:any) {
    
return bcrypt.hashSync(password, salt);
}


export function compareSynchPassword (password,isAvailablePassword):any{
    return bcrypt.compareSync(
        password,
        isAvailablePassword
      );
}


export let Send_mail_user= async (email,token) => {
    
    let transporter= nodemailer.createTransport({
        service:'hotmail',
        auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD
        }
          })
     let send_mail= await  transporter.sendMail({
            from: process.env.MAIL_USERNAME, // sender address
            to: email, // list of receivers
            subject: "User_Forgot_Password_Verification_Link", // Subject line      
            html: `<h1> this is your Forgot Password Verification Link </h1> <h5> http://localhost:${port}/api/resetPassword/?token=${token}</h5> `
          });

          console.log("Message sent: %s", send_mail.messageId)
      console.log("mail send: ",send_mail);
      
        }
  
       






























export interface ITokenData {
    email: string;
    id:number  
}

export interface TokenData {
    email: string;
    id:number  
  }



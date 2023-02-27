
var jwt = require("jsonwebtoken");

//create secretKey in jwt
let secretKey = process.env.SECRET_KEY;

let tokenPayloadFunction=async(isAvailable:any)=>{

    let tokenPayload =  {
    id: isAvailable.id,
    email: isAvailable.email,
  }; 
  return  tokenPayload
}

let token= async ()=>{ let token=await jwt.sign( {tokenPayloadFunction} , secretKey, {
    expiresIn: "300s"
  })
  return token
}
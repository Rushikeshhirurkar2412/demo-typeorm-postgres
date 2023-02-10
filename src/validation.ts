import joi from "joi";

export const userCreateSchema=joi.object({
    fname:joi.string().min(3).max(20).required(),
    lname:joi.string().min(3).max(20).required(),
    email:joi.string().email({minDomainSegments:2,tlds:{ allow: ['com', 'net'] }}).required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: joi.ref('password'),
    age:joi.number().min(3),
    city:joi.string().min(3).max(10),
    state:joi.string().min(3).max(10)

})


export const loginUserSchema=joi.object({

    email:joi.string().email({minDomainSegments:2,tlds:{ allow: ['com', 'net'] }}).required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()

})
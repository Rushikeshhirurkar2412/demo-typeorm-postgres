import joi from "joi";

export const userCreateSchema=joi.object({
    first_name:joi.string().min(3).max(20).required(),
    last_name:joi.string().min(3).max(20).required(),
    email:joi.string().email({minDomainSegments:2,tlds:{ allow: ['com', 'net'] }}).required(),
     password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    confirmPassword: joi.ref('password'),
    age:joi.number().min(3),
    city:joi.string().min(3).max(10),
    state:joi.string().min(3).max(30)

})


export const loginUserSchema=joi.object({

    email:joi.string().email({minDomainSegments:2,tlds:{ allow: ['com', 'net'] }}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))

})



export const forgotPasswordSchema=joi.object({
    email:joi.string().email({minDomainSegments:2,tlds:{ allow: ['com', 'net'] }}).required(),

})

export const resetPasswordSchema=joi.object({
    email:joi.string().email({minDomainSegments:2,tlds:{ allow: ['com', 'net'] }}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    confirmPassword: joi.ref('password')

})

export const updateSchema=joi.object({
    first_name:joi.string().min(3).max(20),
    last_name:joi.string().min(3).max(20),
    email:joi.string().email({minDomainSegments:2,tlds:{ allow: ['com', 'net'] }}),
    age:joi.number().min(3),
    city:joi.string().min(3).max(10),
    state:joi.string().min(3).max(30)

})
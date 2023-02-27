import * as dotenv from "dotenv";
const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import { role, User } from "../../entities/user";
import { user_session } from "../../entities/user_session";
import { loginUserSchema } from "../../common/validation";
import { User_details } from "../../entities/user_details";
import {
  compareSynchPassword,
  Send_mail_user,
} from "../../common/common-function";
import jwt from "jsonwebtoken";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  userCreateSchema,
} from "../../common/validation";
import { HashSyncPassword, ITokenData } from "../../common/common-function";
import { number } from "joi";

dotenv.config();

//create secretKey in jwt
let secretKey = process.env.SECRET_KEY;

//register user
export const createWithRelation = async (req: Request, res: Response) => {
  try {
    await userCreateSchema.validateAsync(req.body);

    let { first_name, last_name, email, password, age, city, state } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (isAvailable) {
      return res.status(400).json({ message: " User already exist" });
    }
    let timestamp = new Date();
    let hashPassword = HashSyncPassword(password);

    const userQuery = await new User();
    userQuery.first_name = first_name;
    userQuery.last_name = last_name;
    userQuery.email = email;
    userQuery.password = hashPassword;
    userQuery.created_by = email;
    userQuery.created_at = timestamp;
    userQuery.role=role.USER

    const userSave = await User.save(userQuery);

    let detailsQuery = await new User_details();
    detailsQuery.age = age;
    detailsQuery.city = city;
    detailsQuery.state = state;
    detailsQuery.user = userQuery;
    detailsQuery.created_by = email;
    detailsQuery.created_at = timestamp;

    const datailsSave = await User_details.save(detailsQuery);

    console.log("user has been created", userQuery, detailsQuery);
    res.status(200).json({ message: "user has been created" });
  } catch (error) {
    res.json({ message: "👎🏻 something went wrong " + error });
  }
};

// login user
export let loginUser = async (req: Request, res: Response) => {
  try {
    await loginUserSchema.validateAsync(req.body);

    let { email, password } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "👎🏻 User does not exist !!!!, please signup " });
    }

    let comparePassword = compareSynchPassword(password, isAvailable.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "👎🏻 incorrect password " });
    }

    //generate token
    const tokenPayload = {
      id: isAvailable.id,
      email: isAvailable.email,
      role:isAvailable.role
    };

    let token = await jwt.sign({ tokenPayload }, secretKey, {
      expiresIn: "7d",
    });

    console.log("token:" + token);

    let timestamp = new Date();

    //check  user token
    if (isAvailable.id !== null) {
      let findSession = await user_session.findOne({
        where: { user_id: { id: isAvailable.id } },
        relations: ["user_id"],
      });

      if (findSession) {
        let findToken = await user_session.update(
          { user_id: { id: isAvailable.id } },
          { is_expired: true }
        );
      }
    }

    let newUserToken = await user_session.insert({
      token: token,
      user_id: isAvailable,
      is_expired: false,
      created_at: timestamp,
    });
    console.log(token);

    return res
      .status(200)
      .json({ message: "👍🏼 user login successfully ", token });
  } catch (error) {
    res.json({ message: "👎🏻 something went wrong " + error });
  }
};

//forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await forgotPasswordSchema.validateAsync(req.body);
    let { email } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "user not exist . please signup" });
    }

    let tokenPayload = {
      id: isAvailable.id,
      email: isAvailable.email,
    };

    let getjwtf = (data: ITokenData) => {
      return jwt.sign(tokenPayload, secretKey, {
        expiresIn: "7d",
      });
    };

    let token = getjwtf(tokenPayload);

    console.log("token :" + token);

    // insert token in user table
    let insertToken = await User.update(
      { id: isAvailable.id },
      { email_verification_token: token }
    );

    let linkSend = await Send_mail_user(email, token);

    res.status(200).json({ message: "link send on email" });
  } catch (error) {
    res.json({ message: "👎🏻 something went wrong " + error });
  }
};

//reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    await resetPasswordSchema.validateAsync(req.body);

    let { token }: any = req.query;
    console.log(token);

    let { email,password } = req.body;
    console.log(password);

    let isAvailable = await User.findOneBy({ email: email });

  //  console.log(isAvailable);

    if (isAvailable) {
      if (token===isAvailable.email_verification_token) {
        let decoded: any = jwt.verify(token, secretKey);
        console.log(decoded);
    
        let hashPassword = HashSyncPassword(password);
    
        let updatePass = await User.update(decoded.id, { password: hashPassword });
        console.log(updatePass);
    
        res.status(200).json({ message: "password changed successfully" });
      }
    }
    res.status(400).json({ message: "user is unautherize." });

  } catch (error) {
    res.json({ message: "👎🏻 something went wrong " + error });
  }
};

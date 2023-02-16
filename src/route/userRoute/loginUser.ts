import * as dotenv from "dotenv";
const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import { User } from "../../entities/user";
import { loginUserSchema } from "../../validation";
var jwt = require("jsonwebtoken");
dotenv.config();

//create secretKey in jwt
let secretKey = process.env.SECRET_KEY;

let loginUser = async (req: Request, res: Response) => {
  try {
    await loginUserSchema.validateAsync(req.body);

    let { email, password } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "👎🏻 User does not exist !!!!, please signup " });
    }

    let comparePassword = await bcrypt.compareSync(
      password,
      isAvailable.password
    );

    if (!comparePassword) {
      return res.status(400).json({ message: "👎🏻 incorrect password " });
    }

    let tokenPayload = {
      id: isAvailable.id,
      email: isAvailable.email,
    };

    let token = await jwt.sign({ tokenPayload }, secretKey, {
      expiresIn: "300s",
    });

    console.log("token :"+token);

    res.status(200).json({ message: "👍🏼 user login successfully ", token });
  } catch (error) {
    res.json({ message: "👎🏻 something went wrong " + error });
  }
};

export default loginUser;

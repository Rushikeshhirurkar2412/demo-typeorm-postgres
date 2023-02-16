import { Request, Response } from "express";
import { register } from "ts-node";
import { User_details } from "../../entities/details";
import { User } from "../../entities/user";
import connections from "../../my-app-data-source";
import { userCreateSchema } from "../../validation";
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

//register user
export const createWithRelation = async (req: Request, res: Response) => {
  try {
    await userCreateSchema.validateAsync(req.body);

    let { fname, lname, email, password, age, city, state } = req.body;

    let isAvailable = await User.findOneBy({ email: email });

    if (isAvailable) {
      return res.status(400).json({ message: " User already exist" });
    }

    let hashPassword = bcrypt.hashSync(password, salt);

    let userQuery = await new User();
    userQuery.first_name = fname;
    userQuery.lname_name = lname;
    userQuery.email = email;
    userQuery.password = hashPassword;

    const userSave = await User.save(userQuery);

    let detailsQuery = await new User_details();
    detailsQuery.age = age;
    detailsQuery.city = city;
    detailsQuery.state = state;
    detailsQuery.user = userQuery;

    const datailsSave = await User_details.save(detailsQuery);

    console.log("user has been created", userQuery, detailsQuery);
    res.status(200).json({ message: "user has been created" });
  } catch (error) {
    res.json({ message: "👎🏻 something went wrong " + error });
  }
};

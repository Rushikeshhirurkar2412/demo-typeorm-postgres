
import { Request, Response } from "express";    
import { HashSyncPassword } from "../../common/common-function";
import { userCreateSchema } from "../../common/validation";
import { role, User } from "../../entities/user";
import { User_details } from "../../entities/user_details";


//register user
export const adminSignup = async (req: Request, res: Response) => {
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
      userQuery.role=role.SUPER_ADMIN
  
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
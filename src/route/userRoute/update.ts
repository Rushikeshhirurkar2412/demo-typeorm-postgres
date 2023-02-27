import { Request, Response } from "express";
import { STATUS_CODES } from "http";
import { date } from "joi";
import { updateSchema } from "../../common/validation";
import { User } from "../../entities/user";
import { User_details } from "../../entities/user_details";
import { user_session } from "../../entities/user_session";

export let updateUser = async (req: Request, res: Response) => {
  try {
    await updateSchema.validateAsync(req.body);
    let { first_name, last_name, city, state, age } = req.body;
    let {id}:any=req.params
    let isAvailable = await User.findOneBy({ id: id });

    if (!isAvailable) {
      res.status(400).send({ message: "user not found" });
    }

    let timestamp = new Date();
    let userUpdate = await User.update(
      { id: isAvailable.id },
      {
        first_name,
        last_name,
        updated_by: isAvailable.email,
        updated_at: timestamp,
      }
    );

    let userDetailsAvailable: any = await User_details.findOneBy({
      user: { id: isAvailable.id },
    });


    let updateDetails = await User_details.update(
      { id: userDetailsAvailable.id },
      { age, city, state, updated_at: timestamp, updated_by: isAvailable.email }
    );
    console.log(updateDetails);

    res.status(200).send({ message: "user update successfully" });
  } catch (error) {
    res.status(400).send({ message: "something went wrong", error });
  }
};

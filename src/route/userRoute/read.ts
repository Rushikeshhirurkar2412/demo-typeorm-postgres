import { Request, Response } from "express";
import { User_details } from "../../entities/user_details";
import { User } from "../../entities/user";
import { user_session } from "../../entities/user_session";

export const getDataUSer = async (req: Request, res: Response) => {
  try {
    let { id }: any = req.params;

    let getData = await User_details.find({
      where: { user: {id:id} },
      relations: ["user"],
    });

    if (getData.length === 0) {
      return res.status(400).json({ message: "id is not found." });
    }

    res.status(200).json({ message: getData });
    console.log(getData);
  } catch (error) {
    res.json({ message: "something went wrong", error });
  }
};

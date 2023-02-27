import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { category } from "../../entities/category";
import jwt from "jsonwebtoken";

let secretKey = process.env.SECRET_KEY;

export const create_category = async (req: Request, res: Response) => {
  try {
    let { category_name, parent_category_id } = req.body;
    let { authorization }: any = req.headers;

    let decodeToken: any = await jwt.verify(authorization, secretKey);
    let payloadId = decodeToken.tokenPayload.id;

    let categoryAvalaible = await category.findOneBy({
      category_name: category_name,
    });

    if (categoryAvalaible) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("this category already exist.");
    }

    let timestemp = new Date();
    let createCategory = new category();
    createCategory.category_name = category_name;
    createCategory.parent_category_id = parent_category_id;
    createCategory.created_at = timestemp;
    createCategory.created_by = payloadId;

    let saveCategory = await category.save(createCategory);
    res.status(StatusCodes.OK).send("category has been inserted");
  } catch (error) {
    res.json({ message: "👎🏻 something went wrong " + error });
  }
};

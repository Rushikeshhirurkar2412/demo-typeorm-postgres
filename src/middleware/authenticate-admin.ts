import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { role } from "../entities/user";
  import jwt from "jsonwebtoken";
  let secretKey = process.env.SECRET_KEY;

export let authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { authorization }: any = req.headers;
  
    

    let decodeToken: any = await jwt.verify(authorization, secretKey);
    let payloadRole = decodeToken.tokenPayload.role;
     console.log(payloadRole);

    if (payloadRole === role.SUPER_ADMIN) {
      return next();
    }

    res.status(400).send("sorry, only super_admin can a0ccess.");

  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send(error);
  }
};

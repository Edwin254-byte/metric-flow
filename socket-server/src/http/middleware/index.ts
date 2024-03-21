import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../../constants";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Please provide token in the authorization header");

    const bearerToken = token.split(" ")[1];
    if (!bearerToken) throw new Error("Invalid token format provided");

    //verify the token
    const payload = verify(bearerToken, JWT_SECRET);
    console.log(payload);

    return next();
  } catch (err) {
    return next(err);
  }
}

import { Request, Response, NextFunction } from "express";
import { User } from "../../utils";
import { signinHandler } from "../handlers.ts";

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const data: User = req.body;
    const token = await signinHandler(data);

    res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}

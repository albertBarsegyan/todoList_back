import { NextFunction, Response, Request } from "express";
import { ResponseStatuses } from "../interfaces/response.interfaces";

export const validate = (schema?: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body);
    return next();
  } catch (err: any) {
    return res.json({ status: ResponseStatuses.Error, data: null, message: err.message });
  }
};

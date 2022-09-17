import { ResponseMessages } from "../constants/messages.constants";

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ResponseStatuses } from "../interfaces/response.interfaces";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = Boolean(authHeader) && authHeader?.split(" ")[1];

  if (!token) {
    return res.json({
      data: null,
      status: ResponseStatuses.Error,
      message: ResponseMessages.wentWrong,
    });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? "secret", (err, userId) => {
    if (err !== null) {
      return res.json({
        data: null,
        status: ResponseStatuses.Error,
        message: err.message,
      });
    }

    req.session.userId = Number(userId);

    next();
  });
};

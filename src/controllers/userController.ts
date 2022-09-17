import { ResponseMessages } from "../constants/messages.constants";
import { IResponse, ResponseStatuses } from "../interfaces/response.interfaces";
import { getUserById } from "../services/user.service";
import { Request, Response } from "express";
import { camelCaseKeys } from "../helpers/object.helpers";

export const userController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  const userInfo = await getUserById(userId);

  const userResponse: IResponse = userInfo
    ? {
        data: userInfo,
        message: ResponseMessages.successMessage,
        status: ResponseStatuses.Success,
      }
    : {
        data: null,
        message: ResponseMessages.dataEmpty,
        status: ResponseStatuses.Success,
      };

  return res.json(userResponse);
};

export const loggedUserController = async (req: Request, res: Response) => {
  const userId = req.session.userId;

  const userData = userId ? await getUserById(userId) : null;

  return res.json({
    data: camelCaseKeys(userData),
    message: ResponseMessages.successMessage,
    status: ResponseStatuses.Success,
  });
};

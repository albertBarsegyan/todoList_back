import { userLogin } from "../services/login.service";
import { IUserLogin, IUserRegister } from "../interfaces/user.interfaces";
import { ResponseMessages } from "../constants/messages.constants";
import { Request, Response } from "express";
import { isEmpty } from "lodash";
import jwt from "jsonwebtoken";
import { registerUser } from "../services/register.service";
import { camelCaseKeys } from "../helpers/object.helpers";
import { ResponseStatuses } from "../interfaces/response.interfaces";

export const registrationController = async (req: Request, res: Response) => {
  const userRegisterData = req.body as IUserRegister;

  if (isEmpty(userRegisterData)) {
    return res.json({
      status: ResponseStatuses.Error,
      data: null,
      message: ResponseMessages.invalidData,
    });
  }

  const resData = await registerUser(userRegisterData);

  return res.json(resData);
};

export const loginController = async (req: Request, res: Response) => {
  const userLoginData = req.body as IUserLogin;

  const loginResponse = await userLogin(userLoginData);

  const isLoginSuccess = loginResponse.status === ResponseStatuses.Success;

  if (isLoginSuccess) {
    const loggedUserData = camelCaseKeys(loginResponse.data);

    const accessToken = jwt.sign(loggedUserData.id, process.env.JWT_TOKEN_SECRET ?? "secret");

    req.session.userId = loggedUserData.id;

    return res.json({
      message: loginResponse.message,
      status: loginResponse.status,
      data: loggedUserData,
      accessToken,
    });
  }

  return res.json(loginResponse);
};

export const logoutController = (req: Request, res: Response) => {
  return req.session.destroy((err: any) => {
    const response = {
      data: null,
      status: err ? ResponseStatuses.Error : ResponseStatuses.Success,
      message: err ? err.message : ResponseMessages.successLogout,
    };

    return res.json(response);
  });
};

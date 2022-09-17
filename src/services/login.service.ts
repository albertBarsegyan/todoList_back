import { comparePassword } from "../helpers/hashPassword.helpers";
import { IUserLogin } from "../interfaces/user.interfaces";
import { prisma } from "../configs/prismaClient";
import { ResponseMessages } from "../constants/messages.constants";
import { IResponse, ResponseStatuses } from "../interfaces/response.interfaces";
import excludeKeysFromObject from "../helpers/removeKeysFromObject.helpers";

export const userLogin = async ({ username, password }: IUserLogin): Promise<IResponse> => {
  const userWithCurrentEmail = await prisma.users.findFirst({
    where: { username },
  });

  if (userWithCurrentEmail) {
    const isPasswordsMatch = await comparePassword(password, userWithCurrentEmail.password);

    if (isPasswordsMatch) {
      const userData = excludeKeysFromObject(userWithCurrentEmail, ["password"]);

      return {
        status: ResponseStatuses.Success,
        data: userData,
        message: ResponseMessages.successLogin,
      };
    }

    return {
      status: ResponseStatuses.Error,
      data: null,
      message: ResponseMessages.passwordIncorrect,
    };
  }

  return { status: ResponseStatuses.Error, data: null, message: ResponseMessages.usernameError };
};

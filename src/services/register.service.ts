import { hashPassword } from "../helpers/hashPassword.helpers";
import { IUserRegister } from "../interfaces/user.interfaces";
import { prisma } from "../configs/prismaClient";
import { ResponseMessages } from "../constants/messages.constants";
import { IResponse, ResponseStatuses } from "../interfaces/response.interfaces";
import { upperFirst } from "lodash";
import excludeKeysFromObject from "../helpers/object.helpers";

export const registerUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
  isAdmin,
}: IUserRegister): Promise<IResponse> => {
  const currentUser = await prisma.users.findFirst({
    where: { username },
  });

  if (currentUser) {
    return {
      status: ResponseStatuses.Error,
      data: null,
      message: ResponseMessages.emailExist,
    };
  }

  try {
    const newUser = await prisma.users.create({
      data: {
        first_name: upperFirst(firstName),
        last_name: upperFirst(lastName),
        is_admin: isAdmin,
        password: hashPassword(password),
        username,
        email,
      },
    });

    const newUserData = excludeKeysFromObject(newUser, ["password"]);

    return {
      status: ResponseStatuses.Success,
      message: ResponseMessages.successMessage,
      data: newUserData,
    };
  } catch (error: any) {
    return { status: ResponseStatuses.Error, message: error.message, data: null };
  }
};

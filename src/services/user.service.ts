import { prisma } from "../configs/prismaClient";
import excludeKeysFromObject from "../helpers/object.helpers";

export const getUserById = async (id: number) => {
  const userFromDb = await prisma.users.findUnique({ where: { id } });

  if (userFromDb) {
    return excludeKeysFromObject(userFromDb, ["password"]);
  }

  return null;
};

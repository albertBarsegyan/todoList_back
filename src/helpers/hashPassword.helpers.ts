import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

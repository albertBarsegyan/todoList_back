import { number, object, string } from "yup";

export const registerDataSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  username: string().required(),
  email: string().required().email(),
  password: string().required().min(8),
  isAdmin: number().default(0),
});

import { object, string } from "yup";

export const loginSchema = object({
  username: string().required().min(5),
  password: string().required().min(8),
});

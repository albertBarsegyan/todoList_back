import { loginController } from "../controllers/authController";
import { RoutePaths } from "../constants/route.constants";
import { Router } from "express";
import { validate } from "../middlewares/validator.middleware";
import { loginSchema } from "../schemas/login.schema";

const loginRouter = Router();

loginRouter.post(RoutePaths.main(), validate(loginSchema), loginController);

export default loginRouter;

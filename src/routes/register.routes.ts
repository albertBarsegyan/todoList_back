import { registerDataSchema } from "../schemas/register.schema";
import { validate } from "../middlewares/validator.middleware";
import { registrationController } from "../controllers/authController";
import { RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const registerRouter = Router();

registerRouter.post(RoutePaths.main(), validate(registerDataSchema), registrationController);

export default registerRouter;

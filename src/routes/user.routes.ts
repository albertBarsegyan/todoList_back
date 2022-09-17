import { authenticateToken } from "../middlewares/authorization.middleware";
import { loggedUserController, userController } from "../controllers/userController";

import { DynamicRoutes, RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const userRouter = Router();

userRouter.get(RoutePaths.me(), authenticateToken, loggedUserController);
userRouter.get(DynamicRoutes.id(), userController);

export default userRouter;

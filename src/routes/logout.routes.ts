import { authenticateToken } from "../middlewares/authorization.middleware";
import { logoutController } from "../controllers/authController";
import { RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const logoutRouter = Router();

logoutRouter.delete(RoutePaths.main(), authenticateToken, logoutController);

export default logoutRouter;

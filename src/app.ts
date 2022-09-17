import "dotenv/config";

import { sessionSettings } from "./configs/session";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { RoutePaths } from "./constants/route.constants";
import loginRouter from "./routes/login.routes";
import session from "express-session";
import bodyParser from "body-parser";
import logoutRouter from "./routes/logout.routes";
import { corsOptions } from "./configs/cors";
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";
import { expressWinstonLogger, logger } from "./configs/logger";
import registerRouter from "./routes/register.routes";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(cors(corsOptions));
app.use(helmet());

app.use(session(sessionSettings));

app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(expressWinstonLogger);

app.use(RoutePaths.login(), loginRouter);
app.use(RoutePaths.logout(), logoutRouter);
app.use(RoutePaths.register(), registerRouter);
app.use(RoutePaths.user(), userRouter);
app.use(RoutePaths.todo(), todoRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});

export { logger };

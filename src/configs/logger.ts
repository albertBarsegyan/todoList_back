import path from "path";

import expressWinston from "express-winston";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, "../../log/access.log"), level: "info" }),
    new winston.transports.File({ filename: path.join(__dirname, "../../log/warnings.log"), level: "warn" }),
    new winston.transports.File({ filename: path.join(__dirname, "../../log/errors.log"), level: "error" }),
  ],
});

const expressWinstonLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,

  msg: function (req, res) {
    return `${req.socket.remoteAddress} [${new Date()}] ${req.method} ${req.url} ${res.statusCode}
            "${req.headers.host}" - "${req.headers["user-agent"]}"`;
  },
  expressFormat: false,
  colorize: false,
});

export { logger, expressWinstonLogger };

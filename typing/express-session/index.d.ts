import { JwtPayload } from "jsonwebtoken";

declare module "express-session" {
  export interface SessionData {
    userId: number;
    userToken: string | JwtPayload;
  }
}

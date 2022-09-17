import cors from "cors";

const allowedOrigins = [
  "http://localhost:3005",
  "http://localhost:7001",
  "http://localhost:3000",
  "https://todo-web-teal.vercel.app",
];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

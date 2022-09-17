import cors from "cors";

const allowedOrigins = [process.env.CORS_AUTH];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

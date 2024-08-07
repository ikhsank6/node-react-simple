import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./routes";
import { responseMiddleware } from "./middlewares/responseMiddleware";

dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json());
app.use(responseMiddleware); // Apply the response middleware

app.use("/api/v1", routes);
app.get("/", (req, res) => res.json({ meta: { status: true, message: 'Rest API is running' },data: [] }));

export default app;

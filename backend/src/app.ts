import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./routes";
import { responseMiddleware } from "./middlewares/responseMiddleware";
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS
// const corsOptions = {
//     origin: ['http://example.com', 'http://anotherdomain.com'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

app.use(cors());
// Middleware
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json());
app.use(responseMiddleware); // Apply the response middleware

app.use("/api/v1", routes);
app.get("/", (req, res) => res.json({ meta: { status: true, message: 'Rest API is running' },data: [] }));

export default app;

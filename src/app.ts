import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS middleware setup to handle cross-origin requests
app.use(cors({
    origin: process.env.CORS_ORIGIN, // CORS_ORIGIN should be defined in environment variables
    credentials: true // Allows sending cookies cross-origin
}));

// Middleware to parse JSON requests with a size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded requests with extended mode for nested objects and a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware to parse cookies
app.use(cookieParser());

export { app };

import multer, { Multer } from "multer"; // Importing multer for file uploads
import { Request } from "express";

// Setting up multer disk storage
const storage = multer.diskStorage({
    destination: function(req:Request, file:any, cb:any) {
        // Callback to determine the destination directory
        cb(null, "./public/temp"); // Storing files in "./public/temp"
    },
    filename: function(req:Request, file:any, cb:any) {
        // Callback to determine the filename
        cb(null, file.originalname); // Using the original filename
    }
});

// Initializing multer with the defined storage settings
export const upload: Multer = multer({
    storage, // Using the storage configuration defined above
});

// Note: Multer is a middleware for handling file uploads in Express.

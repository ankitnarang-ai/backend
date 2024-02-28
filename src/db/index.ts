import mongoose from "mongoose";
import { DB_NAME } from "../constant";

export const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        // Optionally re-throw the error to let the caller handle it
        // throw error;
    }
};

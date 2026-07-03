import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    console.log("Mongo URI:", env.mongoUri);
    try {
        await mongoose.connect(env.mongoUri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
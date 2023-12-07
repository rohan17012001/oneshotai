import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.DBURL || "mongodb://localhost:27017/blog";
console.log(MONGO_URI);
const connectDB = async () => {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("MongoDB connected");
        }).catch((err) => {
            console.log(err);
        }
        )
};

export default connectDB;
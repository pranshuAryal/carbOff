import mongoose from "mongoose";
import env from "./env.js"

const {
	MONGODB_DB,
	MONGODB_HOST = "127.0.0.1",
	MONGODB_PORT = "27017",
} = env;

const mongoURI = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
		});
		console.log("MongoDB connected!");
	} catch (err) {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	}
};

export default connectDB;

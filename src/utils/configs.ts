import { connect } from "mongoose";
import AWS from "aws-sdk";

export const PORT = "9200";
export const DB_URL = "mongodb+srv://mamirazmi:a8073TBW.@sandbox.2vu53.mongodb.net/fs-v01?retryWrites=true&w=majority";
export const ID = "AKIA24ADVONQ5C66DBE7";
export const SECRET = "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";
export const BUCKET_NAME = "furnistore";

// MONGODB CONNECTION
export const connectDB = async () => {
	try {
		await connect(DB_URL);
		console.log("Successfully connected to database...");
	} catch (error) {
		console.log("database connection failed. exiting now...");
		console.error(error);
		process.exit(1);
	}
};

// Initializing S3 Interface
export const s3 = new AWS.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET,
});

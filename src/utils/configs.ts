import { connect } from "mongoose";

export const connectDB = async (url: string) => {
	try {
		await connect(url);
		console.log("Successfully connected to database...");
	} catch (error) {
		console.log("database connection failed. exiting now...");
		console.error(error);
		process.exit(1);
	}
};

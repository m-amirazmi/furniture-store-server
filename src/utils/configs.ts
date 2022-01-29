import { connect } from "mongoose";
import AWS from "aws-sdk";
import fs from "fs";
import { IS3Params } from "./interfaces";
const DB_URL = process.env.DB_URL;
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// MONGODB CONNECTION
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

// AWS S3
export const connectS3 = async () => {
	const s3 = new AWS.S3({
		accessKeyId: ID,
		secretAccessKey: SECRET,
	});

	if (typeof BUCKET_NAME === "string") {
		const params: IS3Params = {
			Bucket: BUCKET_NAME,
			CreateBucketConfiguration: {
				LocationConstraint: "ap-southeast-1",
			},
		};
		s3.createBucket(params, function (err, data) {
			if (err) console.log(err, err.stack);
			else console.log("Bucket Created Successfully", data.Location);
		});
	}
};

// Initializing S3 Interface
export const s3 = new AWS.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET,
});

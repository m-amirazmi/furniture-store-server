import { PutObjectRequest } from "aws-sdk/clients/s3";
import fs from "fs";
import { s3 } from "./configs";
import { IS3Params } from "./interfaces";

export const uploadImage = (imageFile: fs.PathOrFileDescriptor) => {
	const fileContent = fs.readFileSync(imageFile);
	const params: PutObjectRequest = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: "test.png",
		Body: fileContent,
	};

	s3.upload(params, (err, data) => {
		if (err) throw err;
		console.log(`File uploaded successfully. ${data.Location}`);
	});
};

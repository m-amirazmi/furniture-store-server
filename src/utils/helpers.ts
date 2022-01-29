import { PutObjectRequest } from "aws-sdk/clients/s3";
import { UploadedFile } from "express-fileupload";
import { BUCKET_NAME, s3 } from "./configs";
import { IFileUpload } from "./interfaces";

export const uploadFile = async ({ data }: IFileUpload) => {
	const filetype = Object.keys(data)[0];
	const uploadedFile = data[filetype] as UploadedFile;
	const blob = uploadedFile.data;
	const filename = uploadedFile.name.includes(".") ? uploadedFile.name.split(".")[0] : uploadedFile.name;
	const ext = uploadedFile.mimetype.split("/")[1];

	const params: PutObjectRequest = {
		Bucket: `${BUCKET_NAME}/${filetype}`,
		Key: `${filename}.${ext}`,
		Body: blob,
		ACL: "public-read",
	};

	try {
		const saved = await s3.upload(params).promise();
		return saved.Location;
	} catch (error) {
		console.log(error);
	}
};

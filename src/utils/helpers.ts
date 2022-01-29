import { PutObjectRequest } from "aws-sdk/clients/s3";
import { UploadedFile } from "express-fileupload";
import { BUCKET_NAME, s3 } from "./configs";
import { IFileUpload } from "./interfaces";

const saveFile = async ({ filetype, blob, filename, ext }: any) => {
	const params: PutObjectRequest = {
		Bucket: `${BUCKET_NAME}/${filetype}`,
		Key: `${filename}.${ext}`,
		Body: blob,
		ACL: "public-read",
	};

	try {
		const saved = await s3.upload(params).promise();
		return saved;
	} catch (error) {
		console.log(error);
	}
};

export const uploadFile = async ({ data, multiple }: IFileUpload) => {
	let uploadedFile;
	const filetype = Object.keys(data)[0];

	if (multiple === "false") uploadedFile = [data[filetype] as UploadedFile];
	else uploadedFile = data[filetype] as UploadedFile[];

	return await Promise.all(
		uploadedFile.map(async (f) => {
			const blob = f.data;
			const filename = f.name.includes(".") ? f.name.split(".")[0] : f.name;
			const ext = f.mimetype.split("/")[1];
			const saved = await saveFile({ filetype, blob, filename, ext });
			if (saved) return { name: filename, size: f.size, url: saved.Location, type: f.mimetype };
		})
	);
};

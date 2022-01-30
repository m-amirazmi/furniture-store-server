import { PutObjectRequest } from "aws-sdk/clients/s3";
import { UploadedFile } from "express-fileupload";
import { BUCKET_NAME, s3, tiny } from "./configs";
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

const compressedFile = async (file: Buffer) => await tiny.fromBuffer(file).toBuffer();

export const uploadFile = async ({ data, multiple }: IFileUpload) => {
	let uploadedFile;
	const filetype = Object.keys(data)[0];

	if (multiple === "false") uploadedFile = [data[filetype] as UploadedFile];
	else uploadedFile = data[filetype] as UploadedFile[];

	return await Promise.all(
		uploadedFile.map(async (f) => {
			let compressed;
			const blob = f.data;
			const filename = f.name.replace(/\.[^/.]+$/, "");
			const ext = f.mimetype.split("/")[1];

			if (filetype.includes("image")) compressed = await compressedFile(blob);
			else compressed = blob;

			const saved = await saveFile({ filetype, blob: compressed, filename, ext });
			if (saved) return { name: filename, size: compressed.byteLength, url: saved.Location, type: f.mimetype };
		})
	);
};

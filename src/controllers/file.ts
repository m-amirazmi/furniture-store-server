import { Request, Response } from "express";
import probe from "probe-image-size";
import { File } from "../models/file";
import { uploadFile } from "../utils/helpers";
import { IFileDoc } from "../utils/interfaces";

export const createFile = async (req: Request, res: Response) => {
	try {
		if (req.files) {
			const uploadedFile = await uploadFile({ data: req?.files, multiple: req.body.multiple });
			const data = await Promise.all(
				uploadedFile.map(async (f) => {
					if (!f) return res.status(400).json({ message: "Something went wrong" });
					try {
						const fileExists: IFileDoc | null = await File.findOne({ name: f.name });
						const dimensions = await probe(f.url);

						const fileObject = {
							name: f.name,
							url: f.url,
							size: f.size,
							type: f.type,
							width: dimensions.width,
							height: dimensions.height,
						};

						if (fileExists) {
							fileExists.name = f.name;
							fileExists.url = f.url;
							fileExists.size = f.size;
							fileExists.type = f.type;
							fileExists.width = dimensions.width;
							fileExists.height = dimensions.height;

							fileExists.save();
							return fileExists;
						} else {
							const file: IFileDoc = await File.create(fileObject);
							return file;
						}
					} catch (error) {
						return res.status(400).json({ error });
					}
				})
			);
			return res.status(200).json(data);
		}
	} catch (error) {
		return res.status(400).json({ error });
	}
};

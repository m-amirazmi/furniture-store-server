import { Model, model, Schema } from "mongoose";
import { IFileDoc } from "../utils/interfaces";

const fileSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		sizeKB: {
			type: Number,
		},
		sizeMB: {
			type: Number,
		},
	},
	{ timestamps: true }
);

fileSchema.pre("save", function (next) {
	const sizeInKb = parseFloat((this.size * 0.001).toFixed(4));
	const sizeInMb = parseFloat((this.size * 0.001 * 0.001).toFixed(4));
	this.sizeKB = sizeInKb;
	this.sizeMB = sizeInMb;
	next();
});

const File = model<IFileDoc, Model<IFileDoc>>("File", fileSchema);

export { File };

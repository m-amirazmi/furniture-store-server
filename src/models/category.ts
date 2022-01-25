import { Model, model, Schema } from "mongoose";
import { ICategoryDoc } from "../utils/interfaces";

const categorySchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

const Category = model<ICategoryDoc, Model<ICategoryDoc>>("Category", categorySchema);

export { Category };

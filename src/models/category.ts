import { Model, model, Schema } from "mongoose";
import slugify from "slugify";
import { ICategoryDoc } from "../utils/interfaces";

const categorySchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			trim: true,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

categorySchema.pre("save", function (next) {
	const convertSlug = slugify(this.name, {
		lower: true,
		replacement: "-",
		strict: true,
	});
	this.slug = convertSlug;
	next();
});

const Category = model<ICategoryDoc, Model<ICategoryDoc>>("Category", categorySchema);

export { Category };

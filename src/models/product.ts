import { Model, model, Schema } from "mongoose";
import slugify from "slugify";
import { IProductDoc } from "../utils/interfaces";

const productSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		discountRate: {
			type: Number,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		isNew: {
			type: Boolean,
			default: true,
		},
		colors: [{ name: String }],
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		quantity: {
			type: Number,
			required: true,
			default: 0,
		},
		description: {
			type: String,
			required: true,
		},
		sku: {
			type: String,
			required: true,
		},
		vendor: {
			type: String,
		},
		images: [{ url: String }],
		slug: {
			type: String,
			unique: true,
		},
	},
	{ timestamps: true }
);

productSchema.pre("save", function (next) {
	const convertSlug = slugify(this.name, {
		lower: true,
		replacement: "-",
		strict: true,
	});
	this.slug = convertSlug;
	next();
});

const Product = model<IProductDoc, Model<IProductDoc>>("Product", productSchema);

export { Product };

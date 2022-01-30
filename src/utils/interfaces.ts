import { FileArray } from "express-fileupload";
import { Document } from "mongoose";

export interface ICategoryDoc extends Document {
	name: string;
	isFeatured: boolean;
}

export interface IProductDoc extends Document {
	name: string;
	price: number;
	discountRate?: number;
	isFeatured?: boolean;
	isNew: boolean;
	colors?: [{ name: string }];
	category?: string;
	quantity: number;
	description?: string;
	sku: string;
	vendor?: string;
	images: [{ url: string }];
}

export interface IS3Params {
	Bucket: string;
	Key?: string;
	Body?: Buffer;
	CreateBucketConfiguration?: {
		LocationConstraint: string;
	};
}

export interface IFileUpload {
	data: FileArray;
	multiple: string;
}

export interface IFileDoc extends Document {
	name: string;
	url: string;
	type: string;
	size: number;
	sizeKB?: number;
	sizeMB?: number;
	height?: number;
	width?: number;
}

import { FileArray } from "express-fileupload";
import { Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface ICategoryDoc extends Document {
	name: string;
	isFeatured: boolean;
	image: string;
}

export interface IProductDoc extends Document {
	name: string;
	price: number;
	discount?: number;
	isFeatured?: boolean;
	isNew: boolean;
	colors?: [{ name: string }];
	category?: string;
	quantity: number;
	description?: string;
	sku: string;
	vendor?: string;
	image: string;
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

export interface IUserDoc extends Document {
	email: string;
	password: string;
	token?: string;
}
export interface IGetAuthReq extends Request {
	user?: JwtPayload;
}

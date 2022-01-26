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

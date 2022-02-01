import { Request, Response } from "express";
import { Product } from "../models/product";
import { IProductDoc } from "../utils/interfaces";

export const createProduct = async (req: Request, res: Response) => {
	try {
		const product: IProductDoc = await Product.create(req.body);
		return res.status(201).json(product);
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products: IProductDoc[] = await Product.find({}).populate("image").populate("category");
		return res.status(200).json(products);
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export const getProduct = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const product: IProductDoc | null = await Product.findById(id);
		if (product) res.status(200).json(product);
		else return res.status(400).json({ message: "The product does not exists!" });
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, price, discount, isFeatured, category, quantity, description, sku, vendor, image } = req.body;

	try {
		const product: IProductDoc | null = await Product.findById(id);

		if (product) {
			product.name = name;
			product.price = price;
			product.discount = discount;
			product.isFeatured = isFeatured;
			product.category = category;
			product.quantity = quantity;
			product.description = description;
			product.sku = sku;
			product.vendor = vendor;
			product.image = image;
			product.save();
			return res.status(201).json(product);
		} else {
			return res.status(400).json({ message: "The product does not exists!" });
		}
	} catch (error) {
		return res.status(400).json({ error });
	}
};

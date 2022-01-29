import { Request, Response } from "express";
import { Product } from "../models/product";
import { uploadFile } from "../utils/helpers";
import { IProductDoc } from "../utils/interfaces";

export const createProduct = async (req: Request, res: Response) => {
	if (req.files) {
		const url = await uploadFile({ data: req?.files });
		return res.status(200).json({ url });
	}

	// try {
	// 	const product: IProductDoc = await Product.create(req.body);
	// 	return res.status(201).json(product);
	// } catch (error) {
	// 	return res.status(400).json({ error });
	// }
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products: IProductDoc[] = await Product.find({});
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

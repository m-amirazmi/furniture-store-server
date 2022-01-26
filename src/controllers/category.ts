import { Request, Response } from "express";
import { Category } from "../models/category";
import { ICategoryDoc } from "../utils/interfaces";

export const createCategory = async (req: Request, res: Response) => {
	const { name }: ICategoryDoc = req.body;
	if (!name) return res.status(400).json({ message: "Name input should not be emptied!" });

	try {
		const category: ICategoryDoc = await Category.create({ name });
		return res.status(201).json(category);
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const categories: ICategoryDoc[] = await Category.find({});
		return res.status(201).json(categories);
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export const getCategory = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const category: ICategoryDoc | null = await Category.findById(id);
		if (category) res.status(201).json(category);
		else return res.status(400).json({ message: "The category does not exists!" });
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export const updateCategory = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name }: ICategoryDoc = req.body;
	if (!name) return res.status(400).json({ message: "Name input should not be emptied!" });

	try {
		const category: ICategoryDoc | null = await Category.findById(id);
		if (category) {
			category.name = name;
			category.save();
			return res.status(201).json(category);
		} else {
			return res.status(400).json({ message: "The category does not exists!" });
		}
	} catch (error) {
		return res.status(400).json({ error });
	}
};

export const removeCategory = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const category: ICategoryDoc | null = await Category.findByIdAndDelete(id);
		return res.status(200).json(category);
	} catch (error) {
		return res.status(400).json({ error });
	}
};

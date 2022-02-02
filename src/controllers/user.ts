import { Request, Response } from "express";
import { User } from "../models/user";
import { IUserDoc } from "../utils/interfaces";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { JWT_TOKEN } from "../utils/configs";

export const signup = async (req: Request, res: Response) => {
	try {
		const { username, email, password }: IUserDoc = req.body;

		if (!(email && password && username)) return res.status(400).json({ message: "All input is required" });

		const existingUser: IUserDoc | null = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) return res.status(409).json({ message: "User Already Exist. Please Login" });

		const encryptedPassword = await hash(password, 10);

		const user: IUserDoc = await User.create({
			email: email.toLowerCase().trim(),
			password: encryptedPassword,
			username,
		});

		const token = sign({ user_id: user._id, email }, JWT_TOKEN, { expiresIn: "2h" });
		user.token = token;
		return res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			token: user.token,
		});
	} catch (error) {
		console.log(error);
	}
};

export const signin = async (req: Request, res: Response) => {
	try {
		const { email, password, username }: IUserDoc = req.body;

		if (!(email && password)) return res.status(400).json({ message: "All input is required" });
		const user: IUserDoc | null = await User.findOne({ $or: [{ email }, { username }] });

		if (user && (await compare(password, user.password))) {
			const token = sign({ uid: user._id, email }, JWT_TOKEN, { expiresIn: "2h" });
			user.token = token;
			return res.status(200).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				token: user.token,
			});
		} else {
			return res.status(400).json({ message: "Invalid Credentials" });
		}
	} catch (error) {
		console.log(error);
	}
};

export const validateUser = async (req: Request, res: Response) => {
	const token = req.headers["authorization"];
	if (token) {
		try {
			const user: IUserDoc | null = await User.findOne({ token });
			if (!user) return res.status(401).json({ message: "No user found" });
			return res.status(200).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				token: user.token,
			});
		} catch (error) {
			console.log(error);
		}
	}
};

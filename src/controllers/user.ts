import { Request, Response } from "express";
import { User } from "../models/user";
import { IUserDoc } from "../utils/interfaces";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { JWT_TOKEN } from "../utils/configs";

export const signup = async (req: Request, res: Response) => {
	try {
		const { email, password }: IUserDoc = req.body;

		if (!(email && password)) return res.status(400).json({ message: "All input is required" });

		const existingUser: IUserDoc | null = await User.findOne({ email });
		if (existingUser) return res.status(409).json({ message: "User Already Exist. Please Login" });

		const encryptedPassword = await hash(password, 10);

		const user: IUserDoc = await User.create({
			email: email.toLowerCase().trim(),
			password: encryptedPassword,
		});

		const token = sign({ user_id: user._id, email }, JWT_TOKEN, { expiresIn: "2h" });
		user.token = token;
		user.password = "";
		return res.status(201).json({ message: "Successfully signed up!", data: user });
	} catch (error) {
		console.log(error);
	}
};

export const signin = async (req: Request, res: Response) => {
	try {
		const { email, password }: IUserDoc = req.body;

		if (!(email && password)) return res.status(400).json({ message: "All input is required" });
		const user: IUserDoc | null = await User.findOne({ email });

		if (user && (await compare(password, user.password))) {
			const token = sign({ uid: user._id, email }, JWT_TOKEN, { expiresIn: "2h" });
			user.token = token;
			user.password = "";
			return res.status(200).json({ message: "Successfully signed in!", data: user });
		} else {
			return res.status(400).json({ message: "Invalid Credentials" });
		}
	} catch (error) {
		console.log(error);
	}
};

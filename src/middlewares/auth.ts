import { NextFunction, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { JWT_TOKEN } from "../utils/configs";
import { IGetAuthReq } from "../utils/interfaces";

export const verifyUser = (req: IGetAuthReq, res: Response, next: NextFunction) => {
	let token: string = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

	if (!token) return res.status(403).json({ message: "A token is required for authentication" });
	if (token.includes("Bearer")) token = token.split(" ")[1];

	try {
		const decoded = verify(token, JWT_TOKEN) as JwtPayload;
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const createToken = (userId, res) => {
	const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });

	res.cookie("token", token, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: ENV.NODE_ENV === "development" ? false : true
	});

	return token;
};

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../config/env.js";

export const protectRoute = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res
				.status(401)
				.json({ error: "You are not authorized to view this page" });
		}

		const decoded = jwt.verify(token, ENV.JWT_SECRET);

		if (!decoded) {
			return res
				.status(401)
				.json({ error: "You are not authorized to view this page" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.error(error, "Error in protect route middleware");
		res.status(500).json({ error: "Internal Server Error" });
	}
};

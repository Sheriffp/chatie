import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/createToken.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../config/env.js";

export const signup = async (req, res) => {
	const { fullName, email, password } = req.body;
	try {
		if (!fullName || !email || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ error: "Password must be at least 6 characters" });
		}

		if (!email.includes("@")) {
			return res
				.status(400)
				.json({ error: "Enter a valid email address" });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "User already exist" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			fullName,
			email,
			password: hashedPassword
		});

		if (!newUser) {
			return res.status(400).json({ error: "Invalid user data" });
		}

		createToken(newUser._id, res);

		res.status(201).json({
			id: newUser._id,
			fullName: newUser.fullName,
			email: newUser.email,
			profilePic: newUser.profilePic
		});

		try {
			await sendWelcomeEmail(
				newUser.email,
				newUser.fullName,
				ENV.CLIENT_URL
			);
		} catch (error) {
			console.error(error, "Failed to send welcome email");
		}
	} catch (error) {
		console.error("Error in signup controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}
		const passwordMatched = await bcrypt.compare(password, user.password);

		if (!passwordMatched) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		createToken(user._id, res);

		res.status(200).json({
			id: user._id,
			fullName: user.fullName,
			email: user.email,
			profilePic: user.profilePic
		});
	} catch (error) {
		console.error(error, "Error in login controller");
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (_, res) => {
	res.cookie("token", "", { maxAge: 0 });
	res.status(200).json({ message: "Logged out successfully" });
};

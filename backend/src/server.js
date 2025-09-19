import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./config/db.js";

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT;
const NODE_ENV = ENV.NODE_ENV;

app.use(cors());
app.use(express.json());
app.use(cookieParser)

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (_, res) => {
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});

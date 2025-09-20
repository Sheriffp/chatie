import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
	getMembers,
	getChats,
	getMessagesByUserId,
	sendMessage
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/members", getMembers);
router.get("/chats", getChats);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;

import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../config/cloudinary.js";

export const getMembers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId }
		}).select("-password");

		res.status(200).json( filteredUsers );
	} catch (error) {
		console.error(error, "Error in get members controller");
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getMessagesByUserId = async (req, res) => {
	try {
		const myId = req.user._id;
		const { id } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: id },
				{ senderId: id, receiverId: myId }
			]
		});
		res.status(200).json(messages);
	} catch (error) {
		console.error(error);
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		if (!text && !image) {
			return res
				.status(400)
				.json({ error: "Write something or upload an image" });
		}

		if (senderId.equals(receiverId)) {
			return res
				.status(400)
				.json({ error: "You cannot send message to yourself" });
		}
		const receiverExist = User.exists({ _id: receiverId });
		if (!receiverExist) {
			return res.status(400).json({ error: "Receiver not found" });
		}
		let imageUrl;

		if (image) {
			const uploadReponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadReponse.secure_url;
		}

		const newMessage = Message.create({
			senderId,
			receiverId,
			text,
			image: imageUrl
		});

		res.status(201).json(newMessage);
	} catch (error) {
		console.error(error, "Error in send message controller");
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getChats = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const messages = await Message.find({
			$or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
		});

		const chatMembersId = [
			...new Set(
				messages.map(msg =>
					msg.senderId.toString() === loggedInUserId.toString()
						? msg.receiverId.toString()
						: msg.senderId.toString()
				)
			)
		];

		const chatMembers = await User.find({
			_id: { $in: chatMembersId }
		}).select("-password");

		res.status(200).json(chatMembers);
	} catch (error) {
		console.error(error, "Error in chat members controller");
		res.status(200).json({ error: "Internal Server Error" });
	}
};

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
	allMembers: [],
	chats: [],
	mesages: [],
	activeTab: "chats",
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,
	isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
	toggleSound: () => {
		localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
		set({ isSoundEnabled: !get().isSoundEnabled });
	},
	setActiveTab: tab => set({ activeTab: tab }),
	setSelectedUser: selectedUser => set({ selectedUser }),
	getAllMembers: async () => {
		set({ isUsersLoading: true });
		try {
			const res = await axiosInstance.get("/messages/members");
			set({ allMembers: res.data });
		} catch (error) {
			console.error(error, "Error in getAllMembers");
			toast.error(error.response.data.error);
		} finally {
			set({ isUsersLoading: false });
		}
	},
	getChatPartners: async () => {
		set({ isUsersLoading: true });
		try {
			const res = await axiosInstance.get("/messages/chats");
			set({ chats: res.data });
		} catch (error) {
			console.error(error, "Error in getChatPartners");
			toast.error(error.response.data.error);
		} finally {
			set({ isUsersLoading: false });
		}
	}
}));

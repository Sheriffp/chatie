import { create } from "zustand";

export const useAuthStore = create(set => ({
	authUser: {},
	isLoggedIn: false,
	isLoading: false,
	login: () => {
		console.log("We logged in...");
		set({ isLoggedIn: true, isLoading: true });
	}
}));

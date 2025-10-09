import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create(set => ({
	authUser: null,
	isCheckingAuth: true,
	isSigningUp: false,
	isLoggingIn: false,
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/check");

			set({ authUser: res.data });
		} catch (error) {
			console.error(error, "Error in checkAuth");
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},
	signup: async data => {
		set({ isSigningUp: true });
		try {
			const res = await axiosInstance.post("/auth/signup", data);

			set({ authUser: res.data });
			toast.success(
				"Signup successful! You've been automatically logged in"
			);
		} catch (error) {
			console.error(error, "Error in signup");
			toast.error(error.response.data.error);
		} finally {
			set({ isSigningUp: false });
		}
	},
	login: async data => {
		set({ isLoggingIn: true });
		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({ authUser: res.data });
			toast.success("You've logged in sucessfully");
		} catch (error) {
			console.error(error, "Error in login");
			toast.error(error.response.data.error);
		} finally {
			set({ isLoggingIn: false });
		}
	},
	logout: async () => {
		try {
			await axiosInstance.post("auth/logout");
			set({ authUser: null });
			toast.success("You've logged out successfully");
		} catch (error) {
			console.error(error, "Error in logout");
			toast.error(error.response.data.error);
		}
	},
	updateProfile: async data => {
		try {
			const res = await axiosInstance.put("/auth/update-profile", data);
			set({ authUser: res.data });
			toast.success("Profile picture updated successfully");
		} catch (error) {
			console.error(error, "Error in updateProfile");
			toast.error(error.response.data.error);
		}
	}
}));

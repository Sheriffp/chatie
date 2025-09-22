import axios from "axios";

export const axiosInstance = axios.create({
	baseUrl:
		import.meta.env.NODE === "development"
			? "http://localhost:4000/api"
			: "/api",
	withCredentials: true
});

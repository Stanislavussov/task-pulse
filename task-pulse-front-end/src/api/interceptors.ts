import axios, { type CreateAxiosDefaults } from "axios";

import { getAccessToken, removeFromStorage } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";
import { errorCatch } from "./error";

const options: CreateAxiosDefaults = {
	baseURL: "http://localhost:4200/api",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(c => {
	const accessToken = getAccessToken();
	const config = c;

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;
		// @FIXME: Create constant for status codes
		if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;

			try {
				await authService.getNewTokens();

				return axiosWithAuth.request(originalRequest);
			} catch (err) {
				// @FIXME: Improve jwt expired error handling
				if (errorCatch(err) === "jwt expired") {
					removeFromStorage();
				}
			}
		}

		throw error;
	},
);

export { axiosClassic, axiosWithAuth };

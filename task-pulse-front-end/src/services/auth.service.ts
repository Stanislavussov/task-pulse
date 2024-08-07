import { axiosClassic } from "@/api/interceptors";
import type { AuthForm, AuthResponse } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

class AuthService {
	private BASE_URL = "/auth";

	async main(type: "login" | "register", data: AuthForm) {
		const response = await axiosClassic.post<AuthResponse>(`${this.BASE_URL}/${type}`, data);

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	async getNewTokens() {
		const response = await axiosClassic.post<AuthResponse>(`${this.BASE_URL}/login/access-token`);

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(`${this.BASE_URL}/logout`);

		if (response.data) {
			removeFromStorage();
		}

		return response;
	}
}

export const authService = new AuthService();

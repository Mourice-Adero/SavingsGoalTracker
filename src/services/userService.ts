import { login } from "../api/api";
import type { LoginResponse } from "../api/api";

export async function loginUser(username: string, password: string): Promise<LoginResponse & { token?: string }> {
	const resp: any = await login(username, password);
	if (!resp.token && resp.accessToken) {
		resp.token = resp.accessToken;
	}
	if (resp?.token) {
		try {
			localStorage.setItem("token", resp.token);
		} catch (e) {
		}
	}
	return resp as LoginResponse & { token?: string };
}

export default {
	loginUser,
};


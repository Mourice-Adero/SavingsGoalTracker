import { login, LoginResponse } from "../api/api";

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
	return await login(username, password);
}

export default {
	loginUser,
};


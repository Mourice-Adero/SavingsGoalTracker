import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://dummyjson.com",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

export interface LoginResponse {
	id: number;
	username: string;
	email?: string;
	token: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
	const payload = { username, password };
	const resp = await apiClient.post(`/auth/login`, payload);
	return resp.data as LoginResponse;
}

export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	[key: string]: any;
}

export interface ProductsResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export async function getProducts(): Promise<ProductsResponse> {
	const resp = await apiClient.get(`/products`);
	return resp.data as ProductsResponse;
}


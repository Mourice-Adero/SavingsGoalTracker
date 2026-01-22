import { getProducts, ProductsResponse } from "../api/api";

export async function fetchProducts(): Promise<ProductsResponse> {
	return await getProducts();
}

export default {
	fetchProducts,
};


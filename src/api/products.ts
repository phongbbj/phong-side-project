import { http } from "./http";

// products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl?: string;
  // thêm fields khác nếu cần
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await http.get("/products");
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await http.get(`/products/${id}`);
  return res.data;
};

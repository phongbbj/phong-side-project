// src/api/products.ts
import { useQuery } from "@tanstack/react-query";
import { FEATURED_PRODUCTS } from "../data/dumyData";

export type Product = (typeof FEATURED_PRODUCTS)[number];

const PRODUCTS_QUERY_KEY = ["products"];

export async function fetchProducts(): Promise<Product[]> {
  // Giả lập call API
  await new Promise((resolve) => setTimeout(resolve, 300));
  return FEATURED_PRODUCTS;
}

export function useProductsQuery() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
}

export function useProductQuery(id?: string) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    enabled: !!id,
    queryFn: async () => {
      const all = await fetchProducts();
      const product = all.find((p) => String(p.id) === String(id));
      if (!product) {
        throw new Error("Không tìm thấy sản phẩm");
      }
      return product;
    },
  });
}

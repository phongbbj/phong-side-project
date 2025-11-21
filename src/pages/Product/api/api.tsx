import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../../../api/products";

export const useProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });

export const useProductDetailQuery = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

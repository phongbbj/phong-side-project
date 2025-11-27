// src/pages/Home/HomePage.tsx
import { Loader2 } from "lucide-react";
import { useProductsQuery } from "../../api/products";
import HomeContent from "./components/HomeContent";

export default function HomePage() {
  const { data, isLoading, isError } = useProductsQuery();
  const products = data ?? [];

  if (isLoading && !products.length) {
    return (
      <div className="flex h-[60vh] items-center justify-center gap-2 text-body-sm text-muted">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span>Đang tải sản phẩm...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-body-sm text-red-500">
          Có lỗi khi tải danh sách sản phẩm. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  return <HomeContent products={products} />;
}

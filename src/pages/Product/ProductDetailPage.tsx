// src/pages/Product/ProductDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useProductQuery, useProductsQuery } from "../../api/products";
import { Button } from "../../ui/button";
import ProductDetailContent from "./components/ProductDetailContent";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useProductQuery(id);

  const { data: allProducts = [] } = useProductsQuery();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center gap-2 text-body-sm text-muted">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span>Đang tải chi tiết sản phẩm...</span>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-body-sm text-red-500">
          Không tìm thấy thông tin sản phẩm.
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Quay lại
        </Button>
      </div>
    );
  }

  return (
    <ProductDetailContent
      key={product.id}
      product={product}
      allProducts={allProducts}
      onBack={() => navigate(-1)}
      onGoToProduct={(pid) => navigate(`/product/${pid}`)}
    />
  );
}

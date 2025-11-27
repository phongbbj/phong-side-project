import { Star, ShoppingCart, Tag } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../ui/card";
import { Button } from "../../../ui/button";
import { formatCurrency } from "../../../store/cartStore";
import type { Product } from "../../../api/products";

type ProductInfoCardProps = {
  product: Product;
  avgRating: number;
  reviewCount: number;
  onAddToCart: () => void;
};

export default function ProductInfoCard({
  product,
  avgRating,
  reviewCount,
  onAddToCart,
}: ProductInfoCardProps) {
  return (
    <Card className="overflow-hidden border-border bg-white">
      <CardHeader className="space-y-2">
        <p className="text-caption text-gray-500">
          {product.category} · {product.brand}
        </p>
        <CardTitle className="text-heading-md">{product.name}</CardTitle>
        {product.subtitle && (
          <CardDescription className="text-body-sm">
            {product.subtitle}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rating + reviews */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-amber-400/80 stroke-amber-500" />
            <span className="font-semibold text-gray-800">
              {avgRating.toFixed(1)}
            </span>
          </div>
          <span className="text-caption text-muted">
            {reviewCount} đánh giá
          </span>
        </div>

        {/* Giá */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="text-[22px] font-semibold text-red-600">
              {formatCurrency(product.price)}
            </span>
            {product.priceOriginal > product.price && (
              <span className="text-body-sm text-gray-400 line-through">
                {formatCurrency(product.priceOriginal)}
              </span>
            )}
          </div>
          <p className="text-caption text-muted">
            Giá đã bao gồm VAT (nếu có). Vui lòng kiểm tra giỏ hàng trước khi
            thanh toán.
          </p>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-caption text-gray-600"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="space-y-3">
          <Button className="w-full text-white" onClick={onAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Thêm vào giỏ hàng
          </Button>
          <p className="text-caption text-muted">
            Thanh toán an toàn, hỗ trợ đổi trả trong 7 ngày nếu lỗi nhà sản xuất.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

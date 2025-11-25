// src/pages/Product/ProductDetailPage.tsx
import { useParams } from "react-router-dom";
import { FEATURED_PRODUCTS } from "../../data/dumyData";
import { useCartStore, formatCurrency } from "../../store/cartStore";
import { useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const product = FEATURED_PRODUCTS.find((p) => String(p.id) === String(id));

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return <p className="text-sm text-muted">Không tìm thấy sản phẩm.</p>;
  }

  const images: string[] =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const mainImage = images[Math.min(activeImageIndex, images.length - 1)];

  return (
    <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-8">
      {/* Ảnh sản phẩm */}
      <div>
        <div className="aspect-square rounded-xl bg-gray-100 mb-4 overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, index) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-square rounded-md overflow-hidden border ${
                  index === activeImageIndex
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Thông tin sản phẩm */}
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {product.brand} · {product.category}
          </p>
          <h1 className="text-2xl font-semibold mt-1">{product.name}</h1>

          <div className="mt-2 flex items-center gap-3">
            <p className="text-xl font-bold text-primary">
              {formatCurrency(product.price)}
            </p>
            {product.priceOriginal &&
              product.priceOriginal > product.price && (
                <p className="text-sm text-muted line-through">
                  {formatCurrency(product.priceOriginal)}
                </p>
              )}
          </div>

          <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span>★</span>
              <span>{product.rating.toFixed(1)}</span>
            </span>
            <span>|</span>
            <span>
              {product.stock > 0
                ? `Còn ${product.stock} sản phẩm`
                : "Tạm hết hàng"}
            </span>
            {(product.isNew || product.isHot) && (
              <>
                <span>|</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  {product.isNew && "Hàng mới"}
                  {product.isNew && product.isHot && " · "}
                  {product.isHot && "Bán chạy"}
                </span>
              </>
            )}
          </div>

          {product.subtitle && (
            <p className="text-sm text-muted mt-3">{product.subtitle}</p>
          )}
        </div>

        {/* Nút Thêm vào giỏ */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={() =>
              addItem({
                id: product.id,
                src: product.thumbnail,
                name: product.name,
                price: product.price,
              })
            }
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Thêm vào giỏ
          </button>
          <p className="text-xs text-muted">
            Giao hàng nhanh tuỳ khu vực, hỗ trợ đổi trả trong 7 ngày.
          </p>
        </div>

        {/* Mô tả chi tiết */}
        {Array.isArray(product.description) && product.description.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h2 className="text-base font-semibold mb-2">Mô tả chi tiết</h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              {product.description.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Thông số kỹ thuật */}
        {Array.isArray(product.specs) && product.specs.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h2 className="text-base font-semibold mb-2">
              Thông số kỹ thuật
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between gap-4 border-b border-dashed border-gray-200 pb-1"
                >
                  <dt className="text-gray-500">{spec.label}</dt>
                  <dd className="text-gray-800 text-right flex-1">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
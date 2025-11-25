import {
  FEATURED_PRODUCTS,
} from "../../data/dumyData";
import { formatCurrency, useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      {/* ... các section khác (hero, category, promo) nếu có ... */}

      {/* FEATURED PRODUCTS / BEST DEALS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-lg">Sản phẩm nổi bật</h2>
          <button className="text-link">Xem tất cả</button>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group rounded-lg bg-slate-50 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-100 transition overflow-hidden flex flex-col"
            >
              {/* Vùng click để mở trang chi tiết */}
              <button
                type="button"
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex-1 flex flex-col text-left"
              >
                {/* Image */}
                <div className="relative aspect-4/3 bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                  />

                  {(product.isNew || product.isHot) && (
                    <span className="absolute top-2 left-2 text-[11px] bg-red-500 text-white px-2 py-0.5 rounded-full">
                      {product.isNew && "NEW"}
                      {product.isNew && product.isHot && " · "}
                      {product.isHot && "HOT"}
                    </span>
                  )}

                  <span className="absolute bottom-2 left-2 text-[11px] bg-black/70 text-white px-2 py-0.5 rounded-full">
                    {product.brand}
                  </span>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="p-3 space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">
                    {product.category}
                  </p>

                  <h3 className="text-body font-semibold line-clamp-2">
                    {product.name}
                  </h3>

                  {product.subtitle && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.subtitle}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-red-600">
                        {formatCurrency(product.price)}
                      </span>
                      {product.priceOriginal > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatCurrency(product.priceOriginal)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-amber-500">
                      <span>★</span>
                      <span className="text-gray-700">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Nút thêm vào giỏ (không navigate) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addItem({
                    id: product.id,
                    src: product.thumbnail,
                    name: product.name,
                    price: product.price,
                  });
                }}
                className="mt-auto w-full rounded-none border-t border-border bg-primary text-white text-sm font-medium py-1.5 hover:bg-primary/90"
              >
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

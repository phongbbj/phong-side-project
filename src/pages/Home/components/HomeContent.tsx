// src/pages/Home/components/HomeContent.tsx
import { useNavigate } from "react-router-dom";
import { Search, Star, Dot, Loader2 } from "lucide-react";

import { formatCurrency } from "../../../store/cartStore";
import type { Product } from "../../../data/dumyData";
import { useHomeLogic } from "../../../store/homeStore";
type HomeContentProps = {
  products: Product[];
};

export default function HomeContent({ products }: HomeContentProps) {
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    category,
    setCategory,
    brand,
    setBrand,
    priceRange,
    setPriceRange,
    onlyNew,
    setOnlyNew,
    onlyHot,
    setOnlyHot,
    sortBy,
    setSortBy,
    categories,
    brands,
    visibleProducts,
    hasMore,
    isLoadingMore,
    loaderRef,
    handleAddToCart,
  } = useHomeLogic(products);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        {/* Header + search + sort */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-heading-lg flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Star className="w-4 h-4 fill-primary/20 stroke-primary" />
              </span>
              <span>Sản phẩm nổi bật</span>
            </h2>
            <p className="text-body-sm text-muted">
              Lọc theo danh mục, hãng, mức giá, NEW / HOT và sắp xếp theo nhu cầu.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* Search input */}
            <div
              className="
                flex w-full sm:w-64 items-center gap-2
                rounded-md border border-border bg-white px-3 py-1.5
                transition-colors duration-150
                hover:border-primary/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary
              "
            >
              <Search className="w-4 h-4 text-muted flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên, hãng, tag..."
                className="
                  flex-1 bg-transparent border-none outline-none
                  text-body-sm
                "
              />
            </div>

            {/* Sort select */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setSortBy(e.target.value as any)
                }
                className="
                  rounded-md border border-border bg-white px-2 py-1.5 
                  text-body-sm outline-none
                  transition-colors duration-150
                  hover:border-primary/40
                  focus:ring-1 focus:ring-primary focus:border-primary
                "
              >
                <option value="popular">Phổ biến / gợi ý</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating-desc">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bộ lọc chi tiết */}
        <div className="rounded-lg border border-border bg-white p-3 shadow-sm text-body-sm space-y-3">
          {/* Category + brand */}
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-caption text-gray-600">Danh mục:</span>
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`
                  rounded-full border px-3 py-1 text-caption normal-case
                  transition-colors duration-150
                  ${
                    category === "all"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white hover:bg-gray-50"
                  }
                `}
              >
                Tất cả
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`
                    rounded-full border px-3 py-1 text-caption normal-case
                    transition-colors duration-150
                    ${
                      category === c
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-white hover:bg-gray-50"
                    }
                  `}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center flex-row gap-2">
              <span className="text-caption text-gray-600">Hãng:</span>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="
                  rounded-md border border-border bg-white px-2 py-1 
                  text-body-sm outline-none
                  transition-colors duration-150
                  hover:border-primary/40
                  focus:ring-1 focus:ring-primary focus:border-primary
                "
              >
                <option value="all">Tất cả</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price + flags */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-caption text-gray-600">Giá:</span>
              <button
                type="button"
                onClick={() => setPriceRange("all")}
                className={`
                  rounded-full border px-3 py-1 text-caption normal-case
                  transition-colors duration-150
                  ${
                    priceRange === "all"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white hover:bg-gray-50"
                  }
                `}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setPriceRange("lt5")}
                className={`
                  rounded-full border px-3 py-1 text-caption normal-case
                  transition-colors duration-150
                  ${
                    priceRange === "lt5"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white hover:bg-gray-50"
                  }
                `}
              >
                &lt; 5 triệu
              </button>
              <button
                type="button"
                onClick={() => setPriceRange("5to15")}
                className={`
                  rounded-full border px-3 py-1 text-caption normal-case
                  transition-colors duration-150
                  ${
                    priceRange === "5to15"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white hover:bg-gray-50"
                  }
                `}
              >
                5 – 15 triệu
              </button>
              <button
                type="button"
                onClick={() => setPriceRange("gt15")}
                className={`
                  rounded-full border px-3 py-1 text-caption normal-case
                  transition-colors duration-150
                  ${
                    priceRange === "gt15"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white hover:bg-gray-50"
                  }
                `}
              >
                &gt; 15 triệu
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyNew}
                  onChange={(e) => setOnlyNew(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border border-gray-400 text-primary"
                />
                <span className="text-body-sm">Chỉ hiển thị hàng NEW</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyHot}
                  onChange={(e) => setOnlyHot(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border border-gray-400 text-orange-500"
                />
                <span className="text-body-sm">Chỉ hiển thị HOT</span>
              </label>
            </div>
          </div>
        </div>

        {/* Grid sản phẩm + infinite scroll */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product: Product) => (
            <div
              key={product.id}
              className="
                group flex flex-col overflow-hidden rounded-lg bg-slate-50
                shadow-sm ring-1 ring-slate-200/70
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/20
              "
            >
              {/* Vùng click để mở trang chi tiết */}
              <button
                type="button"
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex-1 flex flex-col text-left"
              >
                {/* Vùng ảnh */}
                <div className="aspect-4/3 bg-white flex flex-col overflow-hidden">
                  <div className="relative aspect-4/3 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-200
                        group-hover:scale-[1.02]
                      "
                    />

                    {(product.isNew || product.isHot) && (
                      <span
                        className="
                          absolute top-2 left-2 text-caption px-2 py-0.5 rounded-full
                          bg-primary text-white shadow-sm
                        "
                      >
                        {product.isNew && "NEW"}
                        {product.isNew && product.isHot && " · "}
                        {product.isHot && "HOT"}
                      </span>
                    )}

                    <span
                      className="
                        absolute bottom-2 left-2 text-caption px-2 py-0.5 rounded-full
                        bg-black/70 text-white shadow-sm
                      "
                    >
                      {product.brand}
                    </span>
                  </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="p-3 space-y-1.5 bg-slate-50 group-hover:bg-slate-100/80 transition-colors duration-150">
                  <p className="text-caption text-gray-500 flex items-center gap-1.5">
                    <Dot className="w-3 h-3 text-gray-400" />
                    {product.category}
                  </p>

                  <h3 className="text-body font-semibold line-clamp-2 group-hover:text-primary/90 transition-colors duration-150">
                    {product.name}
                  </h3>

                  {product.subtitle && (
                    <p className="text-body-sm text-gray-500 line-clamp-2">
                      {product.subtitle}
                    </p>
                  )}

                  <div className="flex items-start md:items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2 md:flex-row flex-col">
                      <span className="text-body font-semibold text-red-600">
                        {formatCurrency(product.price)}
                      </span>
                      {product.priceOriginal > product.price && (
                        <span className="text-body-sm text-gray-400 line-through">
                          {formatCurrency(product.priceOriginal)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-caption text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400/80 stroke-amber-500" />
                      <span className="text-gray-700">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Nút thêm vào giỏ (không navigate) */}
              <div className="px-2 pb-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="
                    mt-auto w-full rounded-2xl bg-primary 
                    text-body-sm font-semibold text-white py-1.5
                    transition-colors duration-150
                    hover:bg-primary/90
                  "
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sentinel + spinner load thêm */}
        {hasMore && (
          <div
            ref={loaderRef}
            className="flex items-center justify-center py-6 text-body-sm text-muted"
          >
            {isLoadingMore ? (
              <div className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Đang tải thêm sản phẩm...</span>
              </div>
            ) : (
              <span className="text-caption">
                Kéo xuống để xem thêm sản phẩm...
              </span>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

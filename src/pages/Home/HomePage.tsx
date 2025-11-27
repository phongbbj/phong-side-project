// src/pages/Home/HomePage.tsx
import {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, useCartStore } from "../../store/cartStore";
import { Search, Star, Dot, Loader2 } from "lucide-react";
import { useProductsQuery } from "../../api/products";

type SortOption = "popular" | "price-asc" | "price-desc" | "rating-desc";

const INITIAL_COUNT = 12;
const PAGE_SIZE = 8;

export default function HomePage() {
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [brand, setBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyHot, setOnlyHot] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // React Query
  const { data, isLoading, isError } = useProductsQuery();
  const products = data ?? [];

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let list = products.slice();

    const keyword = search.trim().toLowerCase();
    if (keyword) {
      list = list.filter((p) => {
        const inName = p.name.toLowerCase().includes(keyword);
        const inBrand = p.brand.toLowerCase().includes(keyword);
        const inSubtitle = p.subtitle.toLowerCase().includes(keyword);
        const inTags = p.tags.some((t) => t.toLowerCase().includes(keyword));
        return inName || inBrand || inSubtitle || inTags;
      });
    }

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (brand !== "all") {
      list = list.filter((p) => p.brand === brand);
    }

    if (priceRange !== "all") {
      list = list.filter((p) => {
        const priceM = p.price / 1_000_000;
        if (priceRange === "lt5") return priceM < 5;
        if (priceRange === "5to15") return priceM >= 5 && priceM <= 15;
        if (priceRange === "gt15") return priceM > 15;
        return true;
      });
    }

    if (onlyNew) list = list.filter((p) => p.isNew);
    if (onlyHot) list = list.filter((p) => p.isHot);

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => {
          const scoreA = (a.isHot ? 1 : 0) + a.rating;
          const scoreB = (b.isHot ? 1 : 0) + b.rating;
          return scoreB - scoreA;
        });
    }

    return list;
  }, [
    products,
    search,
    category,
    brand,
    priceRange,
    onlyNew,
    onlyHot,
    sortBy,
  ]);

  // Reset visibleCount khi thay filter/sort/search hoặc khi data đổi
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(INITIAL_COUNT);
  }, [products, search, category, brand, priceRange, onlyNew, onlyHot, sortBy]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setVisibleCount((prev) => prev + PAGE_SIZE);
    setIsLoadingMore(false);
  }, [hasMore, isLoadingMore]);

  // IntersectionObserver cho infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

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
                onChange={(e) => setSortBy(e.target.value as SortOption)}
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
          {visibleProducts.map((product) => (
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
                    addItem({
                      id: product.id,
                      src: product.thumbnail,
                      name: product.name,
                      price: product.price,
                    });
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

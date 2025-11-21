import { useState } from "react";
import {
  CATEGORIES,
  FEATURED_PRODUCTS,
  HERO_SLIDES,
  PROMO_BANNERS,
} from "../../data/dumyData";
import { formatCurrency, useCartStore } from "../../store/cartStore";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCategories, setShowCategories] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const activeSlide = HERO_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === HERO_SLIDES.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-10">
      {/* TOP HERO AREA */}
      <section className="grid gap-4 lg:grid-cols-[260px,minmax(0,1.4fr),280px]">
        {/* LEFT: CATEGORY SIDEBAR (MENU + COLLAPSE) */}
        <aside className="bg-slate-50 rounded-xl shadow-md">
          {/* Header + nút toggle */}
          <button
            type="button"
            onClick={() => setShowCategories((v) => !v)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-t-xl transition
              ${
                showCategories
                  ? "bg-linear-to-r from-sky-500 via-indigo-500 to-purple-500 text-white"
                  : "bg-linear-to-r from-sky-500 via-indigo-500 to-purple-500 hover:bg-slate-100 text-white"
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/20 text-white text-sm">
                ☰
              </span>
              <h2 className="text-heading-md">Danh mục</h2>
            </div>
            <span
              className={`text-xs transition-transform duration-200 ${
                showCategories ? "rotate-180" : ""
              }`}
            >
              ⌃
            </span>
          </button>

          {/* Danh sách có hiệu ứng ẩn/hiện */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showCategories ? "max-h-[430px]" : "max-h-0"
            }`}
          >
            <ul className="py-1 text-body-sm">
              {CATEGORIES.map((item) => (
                <li
                  key={item}
                  onClick={() => setActiveCategory(item)}
                  className={`px-4 py-2.5 flex items-center justify-between gap-2 cursor-pointer group
                    ${
                      activeCategory === item
                        ? "bg-indigo-100 text-indigo-800 font-medium"
                        : "hover:bg-slate-100 text-slate-800"
                    }`}
                >
                  <span className="truncate">{item}</span>
                  <span
                    className={`text-body-sx ${
                      activeCategory === item
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    ▶
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CENTER: HERO SLIDER */}
        <div className="relative bg-linear-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-lg overflow-hidden shadow-md">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top,#fff,transparent_60%),radial-gradient(circle_at_bottom,#fff,transparent_60%)]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 py-7 md:py-9 gap-6">
            {/* TEXT AREA */}
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-caption text-white">
                <span>{activeSlide.badge}</span>
                {activeSlide.discount && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-white text-body-sx font-semibold text-indigo-600">
                    {activeSlide.discount}
                  </span>
                )}
              </div>

              <h1 className="text-display text-white drop-shadow-sm">
                {activeSlide.title}
              </h1>

              <p className="text-body text-white/90 max-w-lg">
                {activeSlide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-sm font-semibold text-indigo-600 hover:bg-gray-100 transition">
                  {activeSlide.ctaLabel}
                </button>
                <span className="text-body-sm text-white/80">
                  Giao nhanh 2h tại một số khu vực.
                </span>
              </div>
            </div>

            {/* IMAGE / MOCKUP AREA */}
            <div className="relative w-full max-w-xs lg:max-w-sm">
              <div className="aspect-4/3 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center overflow-hidden shadow-lg">
                <div className="w-[75%] h-[75%] rounded-xl bg-white/90 shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/bosuutap.jpg"
                    alt="Bộ sưu tập"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating small card */}
              <div className="absolute -bottom-3 -left-2 bg-white rounded-xl shadow-md px-3 py-2 text-body-sm">
                <div className="font-semibold">Ưu đãi hôm nay</div>
                <div className="text-body-sx text-gray-500">
                  Hỗ trợ đổi trả trong 7 ngày.
                </div>
              </div>
            </div>
          </div>

          {/* Slider controls + dots */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-700 text-xs hover:bg-white"
              >
                {"<"}
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-700 text-xs hover:bg-white"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: PROMO BANNERS */}
        <aside className="space-y-3">
          {PROMO_BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`rounded-lg p-4 md:p-5 text-white shadow-md relative overflow-hidden ${
                index === 0
                  ? "bg-linear-to-r from-orange-500 to-amber-500"
                  : index === 1
                  ? "bg-linear-to-r from-emerald-500 to-teal-500"
                  : "bg-linear-to-r from-sky-500 to-indigo-500"
              }`}
            >
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,#fff,transparent_55%)]" />
              <div className="relative z-10 space-y-1">
                <span className="text-caption text-white/90">
                  {banner.label}
                </span>
                <h3 className="text-heading-md text-white">
                  {banner.title}
                </h3>
                <p className="text-body-sm text-white/90">
                  {banner.description}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </section>

      {/* FEATURED PRODUCTS / BEST DEALS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-lg">Sản phẩm nổi bật</h2>
          <button className="text-link">Xem tất cả</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-lg bg-slate-50 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-100 transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-4/3 bg-white flex items-center justify-center">
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-caption bg-red-500 text-white px-2 py-0.5 rounded-full">
                  {product.tag}
                </span>
              </div>

              <div className="p-3 space-y-1.5">
                <h3 className="text-body font-semibold line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-red-600">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatCurrency(Number(product.oldPrice))}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: product.id.toString(),
                      src: product.src,
                      name: product.name,
                      price: Number(product.price),
                    })
                  }
                  className="mt-2 w-full rounded-md bg-primary text-white text-sm font-medium py-1.5 hover:bg-primary/90"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

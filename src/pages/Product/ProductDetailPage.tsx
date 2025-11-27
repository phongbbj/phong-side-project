// src/pages/Product/ProductDetailPage.tsx
import {
  useMemo,
  useState,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Tag,
  Loader2,
} from "lucide-react";

import { useCartStore, formatCurrency } from "../../store/cartStore";
import { useProductQuery, useProductsQuery } from "../../api/products";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const {
    data: product,
    isLoading,
    isError,
  } = useProductQuery(id);

  const { data: allProducts = [] } = useProductsQuery();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // State cho form review
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [lastSubmittedReview, setLastSubmittedReview] = useState<{
    name: string;
    comment: string;
    rating: number;
  } | null>(null);

  useEffect(() => {
    // Reset khi đổi sản phẩm
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveImageIndex(0);
    setLastSubmittedReview(null);
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
  }, [id]);

  // Tính base rating & 3 rating con (r1, r2, r3) dạng integer, avg = baseInt
  const ratingInfo = useMemo(() => {
    if (!product) return null;

    const base = Math.max(1, Math.min(5, Math.round(product.rating || 4.5)));

    const seed =
      String(product.id)
        .split("")
        .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) || 1;

    const randInRange = (s: number, min: number, max: number) => {
      const x = Math.sin(s) * 10000;
      const frac = x - Math.floor(x);
      return min + Math.floor(frac * (max - min + 1));
    };

    const d1 = randInRange(seed, -1, 1);
    const d2 = randInRange(seed + 1, -1, 1);

    const clampRating = (v: number) => Math.max(1, Math.min(5, v));

    let r1 = clampRating(base + d1);
    let r2 = clampRating(base + d2);
    const targetSum = base * 3;
    let r3 = targetSum - r1 - r2;

    if (r3 < 1 || r3 > 5) {
      r1 = base;
      r2 = base;
      r3 = base;
    }

    return {
      baseRating: base,
      r1,
      r2,
      r3,
    };
  }, [product]);

  const mockReviews = useMemo(() => {
    if (!product || !ratingInfo) return [];
    const { r1, r2, r3 } = ratingInfo;

    const baseReviews = [
      {
        id: 1,
        author: "Nguyễn Văn A",
        rating: r1,
        comment: "Chất lượng tốt, đúng mô tả, âm thanh ổn định.",
        createdAt: "2 ngày trước",
      },
      {
        id: 2,
        author: "Trần Thị B",
        rating: r2,
        comment: "Thiết kế đẹp, đeo thoải mái, pin dùng được khá lâu.",
        createdAt: "1 tuần trước",
      },
      {
        id: 3,
        author: "Lê Văn C",
        rating: r3,
        comment: "Giá hợp lý so với cấu hình, giao hàng nhanh.",
        createdAt: "3 tuần trước",
      },
    ];

    const userReview = lastSubmittedReview
      ? {
          id: 4,
          author: lastSubmittedReview.name,
          rating: lastSubmittedReview.rating,
          comment: lastSubmittedReview.comment,
          createdAt: "Vừa gửi",
        }
      : null;

    return userReview ? [...baseReviews, userReview] : baseReviews;
  }, [product, ratingInfo, lastSubmittedReview]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category || p.brand === product.brand)
      )
      .slice(0, 4);
  }, [allProducts, product]);

  const handleSubmitReview = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim() || !product) {
      return;
    }

    setIsSubmittingReview(true);
    setTimeout(() => {
      setLastSubmittedReview({
        name: reviewName.trim(),
        comment: reviewText.trim(),
        rating: reviewRating,
      });
      setReviewName("");
      setReviewText("");
      setReviewRating(5);
      setIsSubmittingReview(false);
    }, 500);
  };

  if (isLoading || !product) {
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

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const activeImage =
    images[activeImageIndex] || images[0] || product.thumbnail;

  const avgRating =
    mockReviews.length > 0
      ? mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
      : ratingInfo?.baseRating ?? Math.round(product.rating || 4);

  return (
    <div className="space-y-8">
      {/* Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-body-sm text-muted hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Row 1: Gallery + Info / Price / Add to cart */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Gallery */}
          <Card className="overflow-hidden border-border bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-body">Hình ảnh sản phẩm</CardTitle>
              <CardDescription>
                Xem chi tiết sản phẩm từ nhiều góc độ.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Ảnh chính */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-white shadow-sm">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {(product.isNew || product.isHot) && (
                  <span className="absolute top-3 left-3 text-caption px-2 py-0.5 rounded-full bg-primary text-white shadow-sm">
                    {product.isNew && "NEW"}
                    {product.isNew && product.isHot && " · "}
                    {product.isHot && "HOT"}
                  </span>
                )}
              </div>

              {/* Thumbnail */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <button
                      key={img + index}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`
                        relative aspect-4/3 overflow-hidden rounded-md bg-white shadow-sm
                        ${
                          index === activeImageIndex
                            ? "ring-2 ring-primary/70"
                            : "ring-1 ring-slate-200 hover:ring-primary/40"
                        }
                      `}
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
            </CardContent>
          </Card>

          {/* Info / Price / Add to cart */}
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
                  {mockReviews.length} đánh giá
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
                  Giá đã bao gồm VAT (nếu có). Vui lòng kiểm tra giỏ hàng trước
                  khi thanh toán.
                </p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
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
                <Button
                  className="w-full text-white"
                  onClick={() =>
                    addItem({
                      id: product.id,
                      src: product.thumbnail,
                      name: product.name,
                      price: product.price,
                    })
                  }
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
                <p className="text-caption text-muted">
                  Thanh toán an toàn, hỗ trợ đổi trả trong 7 ngày nếu lỗi nhà
                  sản xuất.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Thông tin dịch vụ + Thông số kỹ thuật */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Shipping / Warranty */}
          <Card className="border-border bg-white">
            <CardHeader>
              <CardTitle className="text-body">Thông tin dịch vụ</CardTitle>
              <CardDescription>Giao hàng, bảo hành, đổi trả.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-body-sm">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Giao hàng nhanh</p>
                  <p className="text-muted">
                    Dự kiến 1-3 ngày nội thành, 3-5 ngày ngoại tỉnh tùy khu vực.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Bảo hành chính hãng</p>
                  <p className="text-muted">
                    Hỗ trợ bảo hành theo chính sách từ nhà sản xuất, có phiếu /
                    hóa đơn.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCcw className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Đổi trả linh hoạt</p>
                  <p className="text-muted">
                    Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm gặp lỗi kỹ thuật.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông số kỹ thuật */}
          {Array.isArray(product.specs) && product.specs.length > 0 && (
            <Card className="border-border bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-heading-md">
                  Thông số kỹ thuật
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 gap-y-2 text-body-sm">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline gap-4 border-b border-dashed border-gray-200 pb-1.5"
                    >
                      <dt className="min-w-20 text-gray-500">{spec.label}</dt>
                      <dd className="flex-1 text-gray-800">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* BOTTOM GRID: Rating + Comment form (KHÔNG nằm trong grid trên) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Đánh giá & review list */}
        <div className="rounded-xl bg-white shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-body font-semibold">Đánh giá từ khách hàng</h2>
              <p className="text-caption text-muted">
                Điểm số được tổng hợp từ các đánh giá gần đây.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400/90 stroke-amber-500" />
                <span className="text-xl font-semibold">
                  {avgRating.toFixed(1)}
                </span>
              </div>
              <p className="text-caption text-muted">
                {mockReviews.length} đánh giá
              </p>
            </div>
          </div>

          {ratingInfo && (
            <div className="flex flex-wrap gap-4 text-caption text-muted">
              <p>
                Đánh giá 1:{" "}
                <span className="font-medium">{ratingInfo.r1}/5</span>
              </p>
              <p>
                Đánh giá 2:{" "}
                <span className="font-medium">{ratingInfo.r2}/5</span>
              </p>
              <p>
                Đánh giá 3:{" "}
                <span className="font-medium">{ratingInfo.r3}/5</span>
              </p>
            </div>
          )}

          {/* Danh sách review */}
          <div className="space-y-3">
            {mockReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-lg bg-slate-50 px-3 py-2 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-body-sm font-semibold">{rev.author}</p>
                  <span className="text-caption text-muted">
                    {rev.createdAt}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        idx < rev.rating
                          ? "fill-amber-400 stroke-amber-500"
                          : "stroke-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-body-sm text-gray-700">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form comment trực tiếp */}
        <div className="rounded-xl bg-white shadow-sm p-4">
          <div className="space-y-1.5 mb-3">
            <h2 className="text-body font-semibold">Viết đánh giá của bạn</h2>
            <p className="text-caption text-muted">
              Chia sẻ trải nghiệm thực tế để giúp người dùng khác.
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmitReview}>
            <div className="space-y-1.5">
              <Label htmlFor="review-name">Tên hiển thị</Label>
              <Input
                id="review-name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="bg-slate-50 focus:bg-white border-none"
              />
            </div>

            {/* Chọn rating 1–5 sao */}
            <div className="space-y-1.5">
              <Label>Đánh giá của bạn</Label>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = index + 1;
                  const active = value <= reviewRating;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setReviewRating(value)}
                      className="
                        inline-flex items-center justify-center rounded-full
                        p-1.5 transition-transform hover:scale-[1.05]
                      "
                    >
                      <Star
                        className={`w-5 h-5 ${
                          active
                            ? "fill-amber-400 stroke-amber-500"
                            : "stroke-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-caption text-muted">
                  {reviewRating} / 5
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="review-text">Nội dung đánh giá</Label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Nhập đánh giá về chất lượng, trải nghiệm sử dụng..."
                className="
                  min-h-[120px] w-full rounded-md px-3 py-2
                  text-body-sm outline-none bg-slate-50
                  focus:bg-white focus:ring-2 focus:ring-primary/60
                "
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white"
              disabled={isSubmittingReview}
            >
              {isSubmittingReview && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Gửi đánh giá
            </Button>

            <p className="text-caption text-muted">
              Đánh giá của bạn sẽ được hiển thị ngay tại mục “Đánh giá từ khách
              hàng”.
            </p>
          </form>
        </div>
      </div>

      {/* SẢN PHẨM LIÊN QUAN */}
      {relatedProducts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-heading-sm font-semibold">Sản phẩm liên quan</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {relatedProducts.map((p) => (
              <Card
                key={p.id}
                className="cursor-pointer hover:ring-1 hover:ring-primary/40 transition-shadow border-border bg-white"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="aspect-4/3 w-full overflow-hidden rounded-md bg-white shadow-sm">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-caption text-gray-500">
                    {p.category} · {p.brand}
                  </p>
                  <p className="text-body-sm font-semibold line-clamp-2">
                    {p.name}
                  </p>
                  <p className="text-body-sm text-red-600 font-semibold">
                    {formatCurrency(p.price)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// src/pages/Product/ProductDetailPage.tsx
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FEATURED_PRODUCTS } from "../../data/dumyData";
import { useCartStore, formatCurrency } from "../../store/cartStore";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import {
  ArrowLeft,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Tag,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
  ImageOff,
} from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const product = FEATURED_PRODUCTS.find((p) => String(p.id) === String(id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>(
    {}
  );

  if (!product) {
    return (
      <p className="text-body-sm text-muted">
        Không tìm thấy sản phẩm.
      </p>
    );
  }

  // Danh sách images "thực" (ưu tiên product.images, fallback sang thumbnail)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const images: string[] = useMemo(() => {
    const list =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : product.thumbnail
          ? [product.thumbnail]
          : [];

    // Lọc bớt những value falsy đề phòng dữ liệu xấu
    return list.filter(Boolean);
  }, [product]);

  const hasAnyImage = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const safeIndex = hasAnyImage
    ? Math.min(activeImageIndex, images.length - 1)
    : 0;

  const mainImage = hasAnyImage ? images[safeIndex] : null;

  const handlePrevImage = () => {
    if (!hasMultipleImages) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!hasMultipleImages) return;
    setActiveImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageError = (src: string) => {
    setImageErrorMap((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top bar: back + meta */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="inline-flex items-center gap-2 px-2 py-1 text-body-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </Button>

        <div className="flex flex-wrap items-center gap-2 text-body-sm text-muted">
          <span className="uppercase text-caption text-gray-500">
            {product.brand} · {product.category}
          </span>
          {product.tags && product.tags.length > 0 && (
            <>
              <span className="text-gray-300">|</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-caption rounded-full bg-slate-100 px-2 py-0.5 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT: images + gallery */}
        <Card className="border-border bg-white">
          <CardContent className="p-3 md:p-4 space-y-3">
            {/* Gallery info bar */}
            <div className="flex items-center justify-between text-body-sm">
              <div className="inline-flex items-center gap-2 text-muted">
                {hasAnyImage ? (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span>{images.length} hình sản phẩm</span>
                  </>
                ) : (
                  <>
                    <ImageOff className="w-4 h-4" />
                    <span>Chưa có hình sản phẩm</span>
                  </>
                )}
              </div>

              {hasAnyImage && (
                <div className="flex items-center gap-2 text-caption text-gray-500">
                  <span>
                    Hình {safeIndex + 1}/{images.length}
                  </span>
                </div>
              )}
            </div>

            {/* Main image / placeholder */}
            <div className="space-y-2">
              <div className="overflow-hidden rounded-xl bg-gray-50">
                <div className="aspect-square flex items-center justify-center">
                  {hasAnyImage && mainImage && !imageErrorMap[mainImage] ? (
                    <img
                      src={mainImage}
                      alt={product.name}
                      onError={() => handleImageError(mainImage)}
                      className="h-full w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
                        <ImageOff className="h-6 w-6 text-gray-500" />
                      </div>
                      <p className="text-body-sm text-gray-600">
                        Chưa có hình cho sản phẩm này
                      </p>
                      <p className="text-caption text-gray-400">
                        Thông tin chi tiết, mô tả và thông số bên phải vẫn đầy đủ.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls + open gallery (chỉ hiện khi có nhiều ảnh) */}
              {hasAnyImage && (
                <div className="flex items-center justify-between gap-2">

                  {hasMultipleImages && (
                    <Dialog open={openGallery} onOpenChange={setOpenGallery}>
                      <div className="inline-flex gap-1.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-none"
                          onClick={handlePrevImage}
                          disabled={!hasMultipleImages}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-none"
                          onClick={handleNextImage}
                          disabled={!hasMultipleImages}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-2 text-body-sm border-none"
                        onClick={() => setOpenGallery(true)}
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span>Xem toàn bộ ảnh</span>
                      </Button>

                      <DialogContent className="max-w-3xl p-4 md:p-6">
                        <DialogHeader className="mb-2">
                          <DialogTitle className="text-heading-md">
                            {product.name}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          {/* Main image in dialog */}
                          <div className="overflow-hidden rounded-xl bg-gray-50">
                            <div className="aspect-video flex items-center justify-center">
                              {mainImage && !imageErrorMap[mainImage] ? (
                                <img
                                  src={mainImage}
                                  alt={product.name}
                                  onError={() => handleImageError(mainImage)}
                                  className="h-full w-full object-contain"
                                />
                              ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
                                  <ImageOff className="h-8 w-8 text-gray-500" />
                                  <p className="text-body-sm text-gray-600">
                                    Không thể tải hình này.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Controls + thumbnails in dialog */}
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <div className="inline-flex gap-1.5">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={handlePrevImage}
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={handleNextImage}
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              </div>
                              <span className="text-caption text-muted">
                                Hình {safeIndex + 1}/{images.length}
                              </span>
                            </div>

                            <div className="flex gap-2 overflow-x-auto py-1">
                              {images.map((img, index) => (
                                <button
                                  key={img}
                                  type="button"
                                  onClick={() => setActiveImageIndex(index)}
                                  className={`min-w-[72px] max-w-[92px] flex-1 overflow-hidden rounded-md border ${index === safeIndex
                                      ? "border-primary"
                                      : "border-border hover:border-primary/50"
                                    }`}
                                >
                                  <div className="aspect-square">
                                    {!imageErrorMap[img] ? (
                                      <img
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        onError={() => handleImageError(img)}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                        <ImageOff className="h-4 w-4 text-gray-500" />
                                      </div>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnails dưới (desktop) */}
            {hasMultipleImages && (
              <div className="hidden md:grid md:grid-cols-4 md:gap-3 pt-1">
                {images.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border transition-colors duration-150 ${index === safeIndex
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                      }`}
                  >
                    {!imageErrorMap[img] ? (
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        onError={() => handleImageError(img)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100">
                        <ImageOff className="h-4 w-4 text-gray-500" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnails dạng scroll trên mobile */}
            {hasMultipleImages && (
              <div className="md:hidden flex gap-2 overflow-x-auto pt-1">
                {images.map((img, index) => (
                  <button
                    key={`m-${img}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`min-w-[72px] max-w-[90px] flex-1 overflow-hidden rounded-lg border transition-colors duration-150 ${index === safeIndex
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                      }`}
                  >
                    <div className="aspect-square">
                      {!imageErrorMap[img] ? (
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          onError={() => handleImageError(img)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100">
                          <ImageOff className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* RIGHT: info + actions */}
        <div className="space-y-4 md:space-y-5">
          <Card className="border-border bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-heading-lg">
                {product.name}
              </CardTitle>
              {product.subtitle && (
                <CardDescription className="text-body-sm text-muted mt-1.5">
                  {product.subtitle}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price + badges + rating */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-2xl md:text-3xl font-semibold text-primary">
                    {formatCurrency(product.price)}
                  </p>
                  {product.priceOriginal &&
                    product.priceOriginal > product.price && (
                      <p className="text-body-sm text-muted line-through">
                        {formatCurrency(product.priceOriginal)}
                      </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-body-sm text-gray-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400/90 stroke-amber-500" />
                    <span>{product.rating.toFixed(1)}</span>
                  </span>
                  <span className="text-gray-300">|</span>
                  <span>
                    {product.stock > 0
                      ? `Còn ${product.stock} sản phẩm`
                      : "Tạm hết hàng"}
                  </span>
                  {(product.isNew || product.isHot) && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="inline-flex items-center gap-1 text-caption rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">
                        {product.isNew && "Hàng mới"}
                        {product.isNew && product.isHot && " · "}
                        {product.isHot && "Bán chạy"}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-white"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        src: product.thumbnail,
                        name: product.name,
                        price: product.price,
                      })
                    }
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Thêm vào giỏ</span>
                  </Button>
                </div>
                <p className="text-caption text-muted">
                  Giao hàng nhanh tuỳ khu vực · Hỗ trợ đổi trả trong 7 ngày.
                </p>
              </div>

              {/* Service info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/70">
                <div className="flex items-start gap-2">
                  <Truck className="mt-0.5 h-4 w-4 text-primary" />
                  <div className="space-y-0.5">
                    <p className="text-caption text-gray-700">
                      Giao hàng nhanh
                    </p>
                    <p className="text-body-sm text-muted">
                      Dự kiến 1–3 ngày làm việc.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div className="space-y-0.5">
                    <p className="text-caption text-gray-700">
                      Bảo hành chính hãng
                    </p>
                    <p className="text-body-sm text-muted">
                      Theo chính sách nhà sản xuất.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCcw className="mt-0.5 h-4 w-4 text-sky-600" />
                  <div className="space-y-0.5">
                    <p className="text-caption text-gray-700">
                      Đổi trả 7 ngày
                    </p>
                    <p className="text-body-sm text-muted">
                      Hỗ trợ đổi trả nếu lỗi từ NSX.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description + Specs */}
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.isArray(product.description) &&
              product.description.length > 0 && (
                <Card className="border-border bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-heading-md">
                      Mô tả chi tiết
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-body-sm text-gray-700">
                    {product.description.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </CardContent>
                </Card>
              )}

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
                        <dt className="min-w-20 text-gray-500">
                          {spec.label}
                        </dt>
                        <dd className="flex-1 text-gray-800">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Product } from "../../../api/products";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../ui/card";

type ProductGalleryProps = {
  product: Product;
  images: string[];
  activeImage: string;
  activeIndex: number;
  onSelectImage: (index: number) => void;
};

export default function ProductGallery({
  product,
  images,
  activeImage,
  activeIndex,
  onSelectImage,
}: ProductGalleryProps) {
  return (
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
                onClick={() => onSelectImage(index)}
                className={`
                  relative aspect-4/3 overflow-hidden rounded-md bg-white shadow-sm
                  ${
                    index === activeIndex
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
  );
}

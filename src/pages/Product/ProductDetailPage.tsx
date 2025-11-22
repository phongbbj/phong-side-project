import { useParams } from "react-router-dom";
import { FEATURED_PRODUCTS } from "../../data/dumyData";
import { useCartStore } from "../../store/cartStore";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const product = FEATURED_PRODUCTS.find((p) => String(p.id) === id);

  if (!product) {
    return <p className="text-sm text-muted">Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-8">
      {/* Ảnh sản phẩm */}
      <div>
        <div className="aspect-square rounded-xl bg-gray-100 mb-4" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-md bg-gray-100" />
          ))}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-xl font-bold text-primary mt-1">
          {product.price}
        </p>

        <p className="text-sm text-muted mt-3">
          Mô tả sản phẩm (mock). Sau này sẽ lấy từ API / React Query.
        </p>

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
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

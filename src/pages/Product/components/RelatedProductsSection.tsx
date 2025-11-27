import {
  Card,
  CardContent,
} from "../../../ui/card";
import { formatCurrency } from "../../../store/cartStore";
import type { Product } from "../../../api/products";

type RelatedProductsSectionProps = {
  products: Product[];
  onClickProduct: (id: string | number) => void;
};

export default function RelatedProductsSection({
  products,
  onClickProduct,
}: RelatedProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-heading-sm font-semibold">Sản phẩm liên quan</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {products.map((p) => (
          <Card
            key={p.id}
            className="cursor-pointer hover:ring-1 hover:ring-primary/40 transition-shadow border-border bg-white"
            onClick={() => onClickProduct(p.id)}
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
  );
}

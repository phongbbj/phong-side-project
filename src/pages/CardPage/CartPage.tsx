import { Link } from "react-router-dom";
import { formatCurrency, useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = items.length === 0;

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = Number(value);
    if (Number.isNaN(quantity) || quantity <= 0) return;
    updateQuantity(id, quantity);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Giỏ hàng</h1>
      <p className="text-sm text-muted mb-6">
        Kiểm tra lại sản phẩm trước khi thanh toán.
      </p>

      {isEmpty ? (
        <div className="rounded-lg border border-border bg-white p-6 text-center">
          <p className="text-sm text-muted mb-3">
            Giỏ hàng của bạn đang trống.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] gap-6">
          {/* Danh sách sản phẩm */}
          <div className="rounded-lg border border-border bg-white p-4 md:p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b last:border-b-0 border-border/60 pb-4 last:pb-0"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full aspect-square rounded-md bg-gray-100 object-cover md:w-16 md:h-16 md:aspect-auto md:shrink-0"
                  />

                  <div className="flex-1 w-full">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted mt-0.5">
                      Đơn giá: {formatCurrency(item.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs">
                        <span className="text-muted">Số lượng</span>
                        <input
                          type="number"
                          min={1}
                          className="w-16 rounded-md border border-border px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>

                  <div className="text-right text-sm font-semibold md:self-start">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>


            <button
              type="button"
              onClick={clearCart}
              className="mt-4 text-xs text-red-500 hover:underline"
            >
              Xoá toàn bộ giỏ hàng
            </button>
          </div>

          {/* Tóm tắt */}
          <div className="rounded-lg border border-border bg-white p-4 md:p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Tạm tính</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Phí vận chuyển</span>
                <span>Đang tính</span>
              </div>
              <div className="flex justify-between font-semibold text-base mt-2">
                <span>Tổng cộng</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Tiến hành thanh toán
            </Link>

            <Link
              to="/"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

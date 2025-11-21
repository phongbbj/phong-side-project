import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { checkoutSchema, type CheckoutFormValues } from "../../schemas/schema";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormValues) => {
    if (!items.length) return;

    // Sau này: call API tạo đơn hàng
    console.log("Checkout data:", data, items);

    clearCart();
    navigate("/");
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const isCartEmpty = items.length === 0;

  return (
    <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8">
      {/* FORM THANH TOÁN */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border border-border bg-white p-4 md:p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold mb-1">Thanh toán</h1>
        <p className="text-sm text-muted mb-6">
          Vui lòng điền thông tin giao hàng và phương thức thanh toán.
        </p>

        {/* Thông tin nhận hàng */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="fullName">
              Họ và tên
            </label>
            <input
              id="fullName"
              type="text"
              className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ví dụ: Nguyễn Văn A"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ví dụ: 0901 234 567"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email (không bắt buộc)
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ví dụ: email@domain.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Địa chỉ nhận hàng
            </label>
            <input
              id="address"
              type="text"
              className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Số nhà, tên đường..."
              {...register("address")}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="city">
              Tỉnh / Thành phố
            </label>
            <input
              id="city"
              type="text"
              className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ví dụ: TP. Hồ Chí Minh"
              {...register("city")}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="note">
              Ghi chú cho đơn hàng (tuỳ chọn)
            </label>
            <textarea
              id="note"
              rows={3}
              className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
              {...register("note")}
            />
            {errors.note && (
              <p className="mt-1 text-xs text-red-500">{errors.note.message}</p>
            )}
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm font-medium mb-3">Phương thức thanh toán</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                value="cod"
                className="h-4 w-4"
                {...register("paymentMethod")}
              />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                value="banking"
                className="h-4 w-4"
                {...register("paymentMethod")}
              />
              <span>Chuyển khoản ngân hàng</span>
            </label>
          </div>
          {errors.paymentMethod && (
            <p className="mt-1 text-xs text-red-500">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isCartEmpty}
          className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isCartEmpty ? "Giỏ hàng trống" : "Đặt hàng"}
        </button>

        {isCartEmpty && (
          <p className="mt-2 text-xs text-muted">
            Giỏ hàng của bạn hiện đang trống. Vui lòng thêm sản phẩm trước khi
            thanh toán.
          </p>
        )}
      </form>

      {/* TÓM TẮT ĐƠN HÀNG */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6 shadow-sm h-fit">
        <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>

        {isCartEmpty ? (
          <p className="text-sm text-muted">
            Chưa có sản phẩm trong giỏ hàng.
          </p>
        ) : (
          <>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <p className="text-xs text-muted">
                      {formatCurrency(item.price)} / sản phẩm
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-3 space-y-1 text-sm">
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
              <p className="text-[11px] text-muted mt-1">
                Đã bao gồm VAT (nếu có). Phí vận chuyển sẽ được cập nhật ở bước
                tiếp theo.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

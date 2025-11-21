import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên (tối thiểu 2 ký tự)"),
  phone: z.string().min(9, "Vui lòng nhập số điện thoại hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional(),
  address: z.string().min(5, "Vui lòng nhập địa chỉ"),
  city: z.string().min(1, "Vui lòng chọn tỉnh/thành"),
  note: z.string().optional(),
  paymentMethod: z.enum(["cod", "banking"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

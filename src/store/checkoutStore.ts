// src/pages/Checkout/checkout.logic.ts
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore, type CartItem } from "./cartStore";
import { checkoutSchema, type CheckoutFormValues } from "../schemas/schema";

export type UseCheckoutLogicResult = {
  items: CartItem[];
  total: number;
  isCartEmpty: boolean;

  register: UseFormRegister<CheckoutFormValues>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  onSubmit: (data: CheckoutFormValues) => void;
};

export const useCheckoutLogic = (): UseCheckoutLogicResult => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const isCartEmpty = items.length === 0;

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
    // eslint-disable-next-line no-console
    console.log("Checkout data:", data, items);

    clearCart();
    navigate("/");
  };

  return {
    items,
    total,
    isCartEmpty,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

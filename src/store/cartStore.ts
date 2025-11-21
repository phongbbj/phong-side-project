import { create } from "zustand";

type AddItemPayload = {
  id: string | number;
  src: string;
  name: string;
  price: number | string; // có thể truyền vào string từ dummy
  quantity?: number;
};

export type CartItem = {
  id: string;
  src: string;
  name: string;
  price: number;   // trong store CHỈ để number
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (payload: AddItemPayload) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const formatCurrency = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const normalizePrice = (price: number | string): number => {
  if (typeof price === "number") return price;
  const numeric = price.replace(/[^\d]/g, "");
  const parsed = Number(numeric);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (payload) => {
    const { id, name, price, quantity = 1, src } = payload;
    const items = get().items;
    const itemId = String(id);
    const itemSrc = String(src);
    const numericPrice = normalizePrice(price);

    const existing = items.find((item) => item.id === itemId);

    if (existing) {
      set({
        items: items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({
        items: [
          ...items,
          {
            id: itemId,
            src: itemSrc,
            name,
            price: numericPrice,
            quantity,
          },
        ],
      });
    }
  },
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));

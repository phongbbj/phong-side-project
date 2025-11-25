/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { ShoppingCart, BadgePercent, LifeBuoy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AppHeader() {
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [isBumping, setIsBumping] = useState(false);
  const prevQuantity = useRef(totalQuantity);

  useEffect(() => {
    if (totalQuantity > prevQuantity.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 300);
      prevQuantity.current = totalQuantity;
      return () => clearTimeout(timer);
    }

    // cập nhật lại ref khi giảm qty hoặc không đổi
    prevQuantity.current = totalQuantity;
  }, [totalQuantity]);

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className="
              h-9 w-9 md:h-10 md:w-10
              rounded-xl
              bg-linear-to-br from-primary to-indigo-500
              flex items-center justify-center
              text-heading-md text-white
              shadow-md shadow-primary/40
              ring-2 ring-primary/30
            "
          >
            ES
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-heading-md tracking-tight">
              <span className="text-primary">E</span>-Shop
            </span>
            <span className="text-body-sm text-muted hidden sm:inline-block">
              Mini E-commerce playground
            </span>
          </div>
        </Link>

        {/* Cart + nav */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-4 text-body-sm text-muted">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-secondary transition-colors ${
                  isActive ? "text-secondary font-medium" : ""
                }`
              }
            >
              Trang chủ
            </NavLink>

            {/* <button className="inline-flex items-center gap-1 hover:text-secondary transition-colors">
              <BadgePercent className="h-4 w-4" />
              <span className="text-body-sm">Khuyến mãi</span>
            </button>

            <button className="inline-flex items-center gap-1 hover:text-secondary transition-colors">
              <LifeBuoy className="h-4 w-4" />
              <span className="text-body-sm">Hỗ trợ</span>
            </button> */}
          </nav>

          <Link
            to="/cart"
            className={`
              relative inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 
              text-body-sm hover:bg-gray-50
              ${isBumping ? "animate-cart-bump" : ""}
            `}
          >
            <ShoppingCart
              className={`h-4 w-4 ${isBumping ? "scale-110" : ""}`}
            />
            <span>Giỏ hàng</span>
            {totalQuantity > 0 && (
              <span
                className={`
                  absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full 
                  bg-primary text-caption font-semibold text-white
                  ${isBumping ? "animate-cart-badge" : ""}
                `}
              >
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

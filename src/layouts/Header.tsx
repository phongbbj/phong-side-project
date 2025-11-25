import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { ShoppingCart, BadgePercent, LifeBuoy } from "lucide-react";

export function AppHeader() {
    const totalQuantity = useCartStore((state) =>
        state.items.reduce((sum, item) => sum + item.quantity, 0)
    );

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
      text-white text-sm md:text-base font-semibold
      shadow-md shadow-primary/40
      ring-2 ring-primary/30
    "
                    >
                        ES
                    </div>

                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-base md:text-xl tracking-tight">
                            <span className="text-primary">E</span>-Shop
                        </span>
                        <span className="text-[11px] md:text-[12px] text-muted hidden sm:inline-block">
                            Mini E-commerce playground
                        </span>
                    </div>
                </Link>


                {/* Cart + nav */}
                <div className="flex items-center gap-3">
                    <nav className="hidden md:flex items-center gap-4 text-xs text-muted">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `hover:text-secondary transition-colors ${isActive ? "text-secondary font-medium" : ""
                                }`
                            }
                        >
                            Trang chủ
                        </NavLink>

                        <button className="inline-flex items-center gap-1 hover:text-secondary transition-colors">
                            <BadgePercent className="h-4 w-4" />
                            <span>Khuyến mãi</span>
                        </button>

                        <button className="inline-flex items-center gap-1 hover:text-secondary transition-colors">
                            <LifeBuoy className="h-4 w-4" />
                            <span>Hỗ trợ</span>
                        </button>
                    </nav>

                    <Link
                        to="/cart"
                        className="relative inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs md:text-sm hover:bg-gray-50"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Giỏ hàng</span>
                        {totalQuantity > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                                {totalQuantity}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

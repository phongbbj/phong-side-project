// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/Home/HomePage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import CartPage from "../pages/Product/components/CartPage";
import CheckoutPage from "../pages/Pay/CheckoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "pay", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
]);

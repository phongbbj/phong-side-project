/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0f172a",
          foreground: "#f9fafb",
        },
        muted: "#6b7280",
        border: "#e5e7eb",
        background: "#f9fafb",
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "26px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "999px",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
  theme: {
    extend: {
      keyframes: {
        "cart-bump": {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.1)" },
          "30%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "cart-badge": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.25)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "cart-bump": "cart-bump 0.3s ease-out",
        "cart-badge": "cart-badge 0.3s ease-out",
      },
    },
  },
};

import type { ReactNode } from "react";
import { AppHeader } from "./Header";
import { AppFooter } from "./Footer";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen  bg-linear-to-b from-background to-gray-50 text-secondary flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-8">
          {children}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export function AppFooter() {
  return (
    <footer className="border-t border-border/60 bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 md:px-6 py-4 text-[11px] text-muted md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} E-Shop. All rights reserved.</span>
        <span>Mini project · React · Tailwind · TanStack Query · Zustand</span>
      </div>
    </footer>
  );
}

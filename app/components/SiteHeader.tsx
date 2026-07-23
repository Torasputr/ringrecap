import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="font-display text-xl tracking-[0.12em]">
          RING RECAP
        </Link>
        <div className="flex gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          <Link href="/" className="hover:text-cream">
            Home
          </Link>
          <Link href="/events" className="hover:text-cream">
            Events
          </Link>
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";
import { featuredEvent } from "./content/featured";

export default function HomePage() {
  return (
    <section className="relative isolate flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/hero-stadium.jpg'), linear-gradient(135deg, #1a1510 0%, #2a2018 45%, #0c0b0a 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--bg)] via-transparent to-black/40"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16 pt-24 md:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--feature)]">
          Pro wrestling catch-up
        </p>

        <h1 className="font-display text-6xl leading-none sm:text-7xl md:text-8xl lg:text-9xl">
          RING RECAP
        </h1>

        <p className="mt-6 max-w-xl text-xl font-semibold tracking-tight md:text-2xl">
          Catch up before the next big show.
        </p>

        <p className="mt-3 max-w-lg text-base leading-relaxed text-[var(--muted)] md:text-lg">
          Short story threads and watch orders so the matches hit harder.
        </p>

        <div className="mt-10 max-w-xl border-l-2 border-[var(--accent)] pl-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            This week
          </p>
          <p className="mt-1 text-lg font-semibold md:text-xl">
            {featuredEvent.promotion} {featuredEvent.name} · {featuredEvent.venue}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {featuredEvent.blurb}
          </p>
          <a 
            href={featuredEvent.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--cream)] transition hover:text-[var(--feature)]"
          >
            Get Tickets <span aria-hidden className="text-[var(--feature)]">↗</span>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/events/all-in-wembley"
            className="inline-flex items-center bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--cream)] transition hover:bg-[var(--accent-hover)]"
          >
            Open {featuredEvent.promotion} {featuredEvent.name} guide
          </Link>
          <Link
            href="/events"
            className="text-sm font-semibold uppercase tracking-[0.14em] underline-offset-4 hover:underline"
          >
            Browse events
          </Link>
        </div>
      </div>
    </section>
  );
}

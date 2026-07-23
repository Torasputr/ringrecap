import Image from "next/image";
import Link from "next/link";
import { getFeaturedEvent } from "./content/featured";

export default function HomePage() {
  const featuredEvent = getFeaturedEvent();

  return (
    <section className="relative isolate flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #1a1510 0%, #2a2018 45%, #0c0b0a 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-black/40"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16 pt-24 md:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-feature">
          Pro wrestling catch-up
        </p>

        <h1 className="max-w-3xl">
          <span className="sr-only">RING RECAP</span>
          <Image
            src="/ring-recap-logo.svg"
            alt=""
            width={720}
            height={160}
            className="h-auto w-full max-w-xl md:max-w-2xl lg:max-w-3xl"
            priority
            unoptimized
          />
        </h1>

        <p className="mt-6 max-w-xl text-xl font-semibold tracking-tight md:text-2xl">
          Catch up before the next big show.
        </p>

        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted md:text-lg">
          Match-by-match catch-up and short watch orders so the matches hit
          harder.
        </p>

        {featuredEvent ? (
          <>
            <div className="mt-10 max-w-xl border-l-2 border-accent pl-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                This week
              </p>
              <p className="mt-1 text-lg font-semibold md:text-xl">
                {featuredEvent.promotion} {featuredEvent.name} ·{" "}
                {featuredEvent.venue}
              </p>
              <p className="mt-1 text-sm text-muted">{featuredEvent.blurb}</p>
              {featuredEvent.ticketUrl ? (
                <a
                  href={featuredEvent.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:text-feature"
                >
                  Get tickets{" "}
                  <span aria-hidden className="text-feature">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              {featuredEvent.hasGuide ? (
                <Link
                  href={featuredEvent.guideHref}
                  className="inline-flex items-center bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-cream transition hover:bg-accent-hover"
                >
                  Open {featuredEvent.name} guide
                </Link>
              ) : (
                <span className="inline-flex items-center bg-accent/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-muted">
                  {featuredEvent.name} guide coming soon
                </span>
              )}
              <Link
                href="/events"
                className="text-sm font-semibold uppercase tracking-[0.14em] underline-offset-4 hover:underline"
              >
                Browse events
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-10">
            <Link
              href="/events"
              className="inline-flex items-center bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-cream transition hover:bg-accent-hover"
            >
              Browse events
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

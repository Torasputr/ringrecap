import Link from "next/link";
import { promotions } from "../content/promotions";

export default function EventsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-feature">
        Browse
      </p>
      <h1 className="font-display mt-3 text-5xl md:text-7xl">Events</h1>
      <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
        Pick a promotion, then open a show catch-up guide.
      </p>

      <ul className="mt-14 grid gap-10 sm:grid-cols-2">
        {promotions.map((promo) => (
          <li key={promo.slug}>
            <Link
              href={`/events/${promo.slug}`}
              className="group block border-l-2 border-accent pl-5 transition hover:border-feature"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {promo.region}
              </p>
              <h2 className="mt-1 font-display text-3xl tracking-[0.04em] group-hover:text-feature md:text-4xl">
                {promo.shortName}
              </h2>
              <p className="mt-1 text-sm text-cream opacity-90">{promo.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {promo.blurb}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPromotion } from "../../content/promotions";
import { getEventsByPromotion } from "../../content/events";

type Props = {
  params: Promise<{ promotion: string }>;
};

export default async function PromotionEventsPage({ params }: Props) {
  const { promotion: promotionSlug } = await params;
  const promotion = getPromotion(promotionSlug);

  if (!promotion) notFound();

  const promoEvents = getEventsByPromotion(promotionSlug);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28 md:px-10">
      <Link
        href="/events"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--cream)]"
      >
        ← All promotions
      </Link>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--feature)]">
        {promotion.region}
      </p>
      <h1 className="font-display mt-3 text-5xl md:text-7xl">
        {promotion.shortName}
      </h1>
      <p className="mt-4 max-w-xl text-base text-[var(--muted)] md:text-lg">
        {promotion.blurb}
      </p>

      {promoEvents.length === 0 ? (
        <p className="mt-14 text-[var(--muted)]">
          No catch-up guides for {promotion.shortName} yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-14 space-y-10">
          {promoEvents.map((event) => (
            <li
              key={event.slug}
              className="border-l-2 border-[var(--accent)] pl-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {event.dateLabel}
              </p>
              <h2 className="mt-1 font-display text-3xl md:text-4xl">
                {event.name}
              </h2>
              <p className="mt-1 text-sm text-[var(--cream)]/90">{event.venue}</p>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
                {event.blurb}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-5">
                {event.hasGuide ? (
                  <Link
                    href={`/events/${promotion.slug}/${event.slug}`}
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--cream)] hover:text-[var(--feature)]"
                  >
                    Open guide →
                  </Link>
                ) : (
                  <span className="text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
                    Guide coming soon
                  </span>
                )}

                {event.ticketUrl ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--cream)] hover:text-[var(--feature)]"
                  >
                    Get tickets ↗
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
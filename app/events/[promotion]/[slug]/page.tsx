import Link from "next/link";
import { notFound } from "next/navigation";
import { getPromotion } from "../../../content/promotions";
import { getEvent } from "../../../content/events";

type Props = {
  params: Promise<{ promotion: string; slug: string }>;
};

export default async function EventGuidePage({ params }: Props) {
  const { promotion: promotionSlug, slug } = await params;
  const promotion = getPromotion(promotionSlug);
  const event = getEvent(promotionSlug, slug);

  if (!promotion || !event || !event.hasGuide) notFound();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28 md:px-10">
      <Link
        href={`/events/${promotion.slug}`}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--cream)]"
      >
        ← {promotion.shortName} events
      </Link>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--feature)]">
        {promotion.shortName} · {event.dateLabel}
      </p>
      <h1 className="font-display mt-3 text-5xl md:text-7xl">{event.name}</h1>
      <p className="mt-2 text-lg text-[var(--muted)]">{event.venue}</p>
      <p className="mt-6 max-w-xl text-base text-[var(--cream)]">{event.blurb}</p>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Catch-up threads and watch order go here next.
      </p>

      {event.ticketUrl ? (
        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.14em] hover:text-[var(--feature)]"
        >
          Get tickets ↗
        </a>
      ) : null}
    </section>
  );
}
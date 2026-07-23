import Link from "next/link";
import { notFound } from "next/navigation";
import { MatchCardList } from "../../../components/MatchCardList";
import { YouTubeEmbed } from "../../../components/YouTubeEmbed";
import { getPromotion } from "../../../content/promotions";
import { getEvent } from "../../../content/events";
import { getCard } from "../../../content/cards";

type Props = {
  params: Promise<{ promotion: string; slug: string }>;
};

export default async function EventGuidePage({ params }: Props) {
  const { promotion: promotionSlug, slug } = await params;

  const promotion = getPromotion(promotionSlug);
  const event = getEvent(promotionSlug, slug);
  const card = getCard(promotionSlug, slug);

  if (!promotion || !event || !event.hasGuide || !card) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28 md:px-10">
      <Link
        href={`/events/${promotion.slug}`}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-muted hover:text-cream"
      >
        ← {promotion.shortName} events
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-feature">
          {promotion.shortName} · {event.dateLabel}
        </p>
        <h1 className="font-display mt-3 text-5xl leading-none md:text-7xl">
          {event.name}
        </h1>
        <p className="mt-2 text-lg text-muted">{event.venue}</p>
        <p className="mt-6 text-base leading-relaxed text-cream md:text-lg">
          {card.tldr}
        </p>

        {event.ticketUrl ? (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:text-feature"
          >
            Get tickets
            <span aria-hidden className="text-feature">
              ↗
            </span>
          </a>
        ) : null}
      </header>

      {card.watchOrder && card.watchOrder.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-3xl tracking-[0.04em] md:text-4xl">
            Quick watch order
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Do this first if you only have limited time.
          </p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
            {card.watchOrder.map((item) => (
              <li key={item.title} className="border-l-2 border-feature pl-5">
                <p className="text-sm font-semibold text-cream">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.why}</p>
                {item.where ? (
                  <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-feature">
                    {item.where}
                  </p>
                ) : null}
                {item.youtubeId ? (
                  <YouTubeEmbed videoId={item.youtubeId} title={item.title} />
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-16">
        <h2 className="font-display text-3xl tracking-[0.04em] md:text-4xl">
          Match card
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted lg:hidden">
          Tap a match to open the catch-up underneath it.
        </p>
        <p className="mt-2 hidden max-w-xl text-sm text-muted lg:block">
          Pick a match on the left — full catch-up shows on the right.
        </p>

        <MatchCardList matches={card.matches} />
      </section>

      <section className="mt-16 max-w-2xl border-t border-white/10 pt-10">
        <h2 className="font-display text-3xl tracking-[0.04em]">
          After the show
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          {card.afterShow}
        </p>
      </section>
    </article>
  );
}

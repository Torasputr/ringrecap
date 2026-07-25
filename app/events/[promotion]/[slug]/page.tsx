import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MatchCardList } from "../../../components/MatchCardList";
import {
  EventLocalDate,
  EventLocalTimes,
} from "../../../components/EventLocalTimes";
import { YouTubeEmbed } from "../../../components/YouTubeEmbed";
import { getCard } from "../../../content/cards";
import { getEvent } from "../../../content/events";
import { getPromotion } from "../../../content/promotions";

type Props = {
  params: Promise<{ promotion: string; slug: string }>;
};

function hasCardImage(src?: string) {
  if (!src) return false;
  if (src.startsWith("https://") || src.startsWith("http://")) return true;
  if (!src.startsWith("/")) return false;
  return existsSync(path.join(process.cwd(), "public", src.slice(1)));
}

export default async function EventGuidePage({ params }: Props) {
  const { promotion: promotionSlug, slug } = await params;

  const promotion = getPromotion(promotionSlug);
  const event = getEvent(promotionSlug, slug);
  const card = getCard(promotionSlug, slug);

  if (!promotion || !event || !event.hasGuide || !card) {
    notFound();
  }

  const locationLine = [event.venue, event.city].filter(Boolean).join(" · ");
  const showCardImage = hasCardImage(event.cardImageSrc);

  return (
    <article className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28 md:px-10">
      <Link
        href={`/events/${promotion.slug}`}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-muted hover:text-cream"
      >
        ← {promotion.shortName} events
      </Link>

      <header className="mt-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-feature">
              {promotion.name}
            </p>

            <h1 className="font-display mt-3 text-5xl leading-none md:text-7xl lg:text-8xl">
              {event.name}
            </h1>

            <dl className="mt-8 space-y-4 text-sm md:text-base">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Date
                </dt>
                <dd className="mt-1 text-cream">
                  <EventLocalDate
                    startsAt={event.startsAt}
                    fallback={event.dateLabel}
                  />
                </dd>
              </div>

              {event.buyInAt || event.startsAt || event.timeLabel ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    Time
                  </dt>
                  <dd className="mt-1 text-cream">
                    <EventLocalTimes
                      buyInAt={event.buyInAt}
                      startsAt={event.startsAt}
                      fallback={event.timeLabel}
                    />
                  </dd>
                </div>
              ) : null}

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Location
                </dt>
                <dd className="mt-1 text-cream">{locationLine}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {event.watchUrl ? (
                <a
                  href={event.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-cream transition hover:bg-accent-hover"
                >
                  {event.watchLabel ?? "Where to watch"}
                  <span aria-hidden>↗</span>
                </a>
              ) : null}

              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-cream/25 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-cream transition hover:border-feature hover:text-feature"
                >
                  Get tickets
                  <span aria-hidden className="text-feature">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </div>

          <figure className="w-full">
            {showCardImage && event.cardImageSrc ? (
              <div className="overflow-hidden border border-white/10 bg-black/30">
                {event.cardImageSourceUrl ? (
                  <a
                    href={event.cardImageSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition hover:opacity-95"
                  >
                    <Image
                      src={event.cardImageSrc}
                      alt={event.cardImageAlt ?? `${event.name} match card`}
                      width={900}
                      height={1200}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </a>
                ) : (
                  <Image
                    src={event.cardImageSrc}
                    alt={event.cardImageAlt ?? `${event.name} match card`}
                    width={900}
                    height={1200}
                    className="h-auto w-full object-cover"
                    priority
                  />
                )}
              </div>
            ) : (
              <div className="flex min-h-72 items-center justify-center border border-dashed border-white/20 bg-black/20 px-6 py-12 text-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cream">
                    Match card graphic
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                    Set{" "}
                    <code className="text-feature">cardImageSrc</code> on the
                    event to show the official card graphic here.
                  </p>
                </div>
              </div>
            )}
            <figcaption className="mt-3 text-xs text-muted">
              {event.cardImageSourceUrl ? (
                <>
                  Source:{" "}
                  <a
                    href={event.cardImageSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-feature underline-offset-2 hover:underline"
                  >
                    AEW on X
                  </a>
                  . Unofficial fan guide — not affiliated with{" "}
                  {promotion.shortName}.
                </>
              ) : (
                <>
                  Official match card graphic for reference. Unofficial fan
                  guide — not affiliated with {promotion.shortName}.
                </>
              )}
            </figcaption>
          </figure>
        </div>
      </header>

      {card.tldr ? (
        <p className="mt-12 max-w-3xl text-base leading-relaxed text-cream md:text-lg">
          {card.tldr}
        </p>
      ) : null}

      {card.watchOrder && card.watchOrder.length > 0 ? (
        <section className="mt-14 text-center">
          <h2 className="font-display text-3xl tracking-[0.04em] md:text-4xl">
            Quick watch order
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Do this first if you only have limited time.
          </p>
          <ul className="mx-auto mt-8 max-w-2xl text-left">
            {card.watchOrder.map((item) => (
              <li key={item.title}>
                <p className="text-center text-sm font-semibold text-cream">
                  {item.title}
                </p>
                <p className="mt-1 text-center text-sm text-muted">{item.why}</p>
                {item.where ? (
                  <p className="mt-0.5 text-center text-xs uppercase tracking-[0.12em] text-feature">
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
          Tap a match clip to open the catch-up underneath it.
        </p>
        <p className="mt-2 hidden max-w-xl text-sm text-muted lg:block">
          Click a match clip on the left — full catch-up shows on the right.
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

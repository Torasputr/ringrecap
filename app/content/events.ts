export type WrestlingEvent = {
  slug: string;
  promotionSlug: string;
  name: string;
  venue: string;
  city?: string;
  dateLabel: string;
  /** Fallback text if local times are unavailable */
  timeLabel?: string;
  /** Absolute ISO datetimes — shown in each visitor’s local timezone */
  buyInAt?: string;
  startsAt?: string;
  blurb: string;
  ticketUrl?: string;
  watchUrl?: string;
  watchLabel?: string;
  /** Local /public path or remote image URL (e.g. pbs.twimg.com) */
  cardImageSrc?: string;
  cardImageAlt?: string;
  /** Credit / original post for the card graphic */
  cardImageSourceUrl?: string;
  hasGuide: boolean;
};

/** Newest featured show = last entry. Append new events at the end. */
export const events: WrestlingEvent[] = [
  {
    slug: "redemption",
    promotionSlug: "aew",
    name: "Redemption",
    venue: "Bell Centre",
    city: "Montreal, QC, Canada",
    dateLabel: "Sun 26 Jul 2026",
    // EDT (UTC-4) in late July
    buyInAt: "2026-07-26T18:00:00-04:00",
    startsAt: "2026-07-26T19:00:00-04:00",
    timeLabel: "Buy-In 6pm ET · PPV 7pm ET",
    blurb: "Match-by-match catch-up for AEW’s Montreal PPV.",
    ticketUrl: "https://www.allelitewrestling.com/aew-event/aew-redemption",
    watchUrl: "https://www.max.com/",
    watchLabel: "Watch on HBO Max",
    cardImageSrc:
      "https://pbs.twimg.com/media/HN97ZOlaYAE2xjw?format=jpg&name=4096x4096",
    cardImageAlt: "AEW Redemption official match card",
    cardImageSourceUrl:
      "https://x.com/AEW/status/2080850539412402222/photo/1",
    hasGuide: true,
  },
];

export function getEventsByPromotion(promotionSlug: string) {
  return events.filter((e) => e.promotionSlug === promotionSlug);
}

export function getEvent(promotionSlug: string, slug: string) {
  return events.find(
    (e) => e.promotionSlug === promotionSlug && e.slug === slug,
  );
}

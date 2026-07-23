export type WrestlingEvent = {
  slug: string;
  promotionSlug: string;
  name: string;
  venue: string;
  dateLabel: string;
  blurb: string;
  ticketUrl?: string;
  hasGuide: boolean;
};

/** Newest featured show = last entry. Append new events at the end. */
export const events: WrestlingEvent[] = [
  {
    slug: "redemption",
    promotionSlug: "aew",
    name: "Redemption",
    venue: "Bell Centre, Montreal",
    dateLabel: "Sun 26 Jul 2026",
    blurb: "Match-by-match catch-up for AEW’s Montreal PPV.",
    ticketUrl:
      "https://www.allelitewrestling.com/aew-event/aew-redemption",
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
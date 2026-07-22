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

export const events: WrestlingEvent[] = [
  {
    slug: "all-in-wembley",
    promotionSlug: "aew",
    name: "All In",
    venue: "Wembley Stadium",
    dateLabel: "Sun 30 Aug 2026",
    blurb: "Three threads. A short watch order. Enjoy the card.",
    ticketUrl:
      "https://www.allelitewrestling.com/aew-event/aew-all-in-london-2026",
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
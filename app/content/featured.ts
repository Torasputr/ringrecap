export type FeaturedEvent = {
  slug: string;
  promotionSlug: string;
  promotion: string;
  name: string;
  venue: string;
  blurb: string;
  guideHref: string;
  ticketUrl: string;
};

export const featuredEvent: FeaturedEvent = {
  slug: "all-in-wembley",
  promotionSlug: "aew",
  promotion: "AEW",
  name: "All In",
  venue: "Wembley",
  blurb: "Three threads. A short watch order. Enjoy the card.",
  guideHref: "/events/aew/all-in-wembley",
  ticketUrl:
    "https://www.allelitewrestling.com/aew-event/aew-all-in-london-2026",
};
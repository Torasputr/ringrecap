import { events } from "./events";
import { getPromotion } from "./promotions";

export type FeaturedEvent = {
  slug: string;
  promotionSlug: string;
  promotion: string;
  name: string;
  venue: string;
  blurb: string;
  guideHref: string;
  ticketUrl?: string;
  hasGuide: boolean;
};

/**
 * Featured = latest event in `events` (append new shows at the end of that list).
 */
export function getFeaturedEvent(): FeaturedEvent | null {
  const latest = events.at(-1);
  if (!latest) return null;

  const promotion = getPromotion(latest.promotionSlug);

  return {
    slug: latest.slug,
    promotionSlug: latest.promotionSlug,
    promotion: promotion?.shortName ?? latest.promotionSlug.toUpperCase(),
    name: latest.name,
    venue: latest.venue,
    blurb: latest.blurb,
    guideHref: `/events/${latest.promotionSlug}/${latest.slug}`,
    ticketUrl: latest.ticketUrl,
    hasGuide: latest.hasGuide,
  };
}

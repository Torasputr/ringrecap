export type Promotion = {
  slug: string;
  name: string;
  shortName: string;
  region: string;
  blurb: string;
};

export const promotions: Promotion[] = [
  {
    slug: "aew",
    name: "All Elite Wrestling",
    shortName: "AEW",
    region: "US",
    blurb: "Weekly TV and big PPVs — currently featuring Redemption.",
  },
  {
    slug: "wwe",
    name: "WWE",
    shortName: "WWE",
    region: "US",
    blurb: "Raw, SmackDown, and premium live events.",
  },
  {
    slug: "njpw",
    name: "New Japan Pro-Wrestling",
    shortName: "NJPW",
    region: "Japan",
    blurb: "Strong style, G1, and Wrestle Kingdom season.",
  },
  {
    slug: "tjpw",
    name: "Tokyo Joshi Pro-Wrestling",
    shortName: "TJPW",
    region: "Japan",
    blurb: "Fast, character-driven joshi wrestling.",
  },
  {
    slug: "stardom",
    name: "World Wonder Ring STARDOM",
    shortName: "STARDOM",
    region: "Japan",
    blurb: "Joshi’s biggest stages and title pictures.",
  },
];

export function getPromotion(slug: string) {
  return promotions.find((p) => p.slug === slug);
}
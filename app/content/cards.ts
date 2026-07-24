export type WatchItem = {
  title: string;
  why: string;
  where?: string;
  /** YouTube video id from watch?v=… */
  youtubeId?: string;
};

export type StorySection = {
  heading: string;
  body: string;
};

export type CardMatch = {
  id: string;
  /** Names shown as the main heading for the match */
  wrestlers: string[];
  /** Optional belt / bout label (small text above names) */
  championship?: string;
  /** Always visible on the compact card */
  stakes: string;
  /** Optional one-liner on the compact card */
  teaser?: string;
  /** Short sections for the detail column */
  storySections: StorySection[];
  /** Watch items — shown in the detail column */
  watch?: WatchItem[];
};

export type EventCard = {
  promotionSlug: string;
  eventSlug: string;
  tldr: string;
  watchOrder?: WatchItem[];
  matches: CardMatch[];
  afterShow: string;
};

/**
 * Key = "promotionSlug/eventSlug"
 * Matches URL: /events/aew/redemption
 */
export const cards: Record<string, EventCard> = {
  "aew/redemption": {
    promotionSlug: "aew",
    eventSlug: "redemption",
    tldr:
      "AEW Redemption (Sun Jul 26, Bell Centre, Montreal) is a stacked title card on the road to All In. Skim the match list, then open only the stories you need — you don’t have to watch every Dynamite.",
    watchOrder: [
      {
        title: "Omega wins the world title",
        why: "Everything on this show orbits the new champion.",
        where: "Dynamite: Beach Break — Jul 8",
        youtubeId: "aeB6poTvV04",
      },
      {
        title: "The Death Riders (Mox and Ospreay) have a clash against The Elite",
        why: "Locks in the trust war heading toward All In.",
        where: "AEW Dynamite - Jul 22",
        youtubeId: "mmkVApUp1g0",
      },
      {
        title: "Willow wins the Casino Gauntlet",
        why: "Explains her Women’s World title shot.",
        where: "Dynamite: Beach Break — Jul 8",
        youtubeId: "l8a3yMI8QfQ",
      },
      {
        title: "Death Riders beatdown on Cope & Christian",
        why: "Claudio Castagnoli and PAC ambushes Cage & Cope at a backstage segment",
        where: "Dynamite — Jul 22",
        youtubeId: "grFVOyHdsbo",
      },
      {
        title: "Painmaker return",
        why: "Chris Jericho brings back his Painmaker persona.",
        where: "Dynamite — Jul 15",
        youtubeId: "cvoUDfZVlHk",
      },
    ],
    matches: [
      {
        id: "world-title",
        wrestlers: ["Kenny Omega (c)", "Kevin Knight"],
        championship: "AEW World Championship",
        stakes: "Omega’s first defense as the new world champion",
        teaser: "Rising star vs the measuring stick — on the road to All In.",
        storySections: [
          {
            heading: "How Omega got here",
            body: "At Beach Break (Jul 8), Kenny Omega beat MJF to become AEW World Champion again, framed as a last-chance title win since if Kenny Omega lost the match, he won't be able to challenge the AEW World Championship ever again.",
          },
          {
            heading: "Why Knight?",
            body: "TNT Champion Kevin Knight asked for the shot. He’d hoped Omega would honor a title opportunity tied to MJF’s previous promise. Omega didn’t honor that exact deal — but he still gave Knight the match.",
          },
          {
            heading: "The final build-up",
            body: "After Kenny Omega's match against the Don Callis Family, Kevin Knight showed up and attacked Kenny Omega in the head with the TNT Title and made Kenny Omega bleed. Kevin Knight then stands tall while holding both the TNT Title and the AEW World Championship Title."
          }
        ],
        watch: [
          {
            title: "Omega vs MJF — title win",
            why: "See how the reign began.",
            where: "Dynamite: Beach Break — Jul 8",
            youtubeId: "aeB6poTvV04",
          },
          {
            title: "Knight challenges Omega",
            why: "Shows why this match is on Redemption.",
            where: "AEW Dynamite — Jul 15",
            youtubeId: "JX_1ujXEP98"
          },
          {
            title: "Kevin Knight stands tall at the go home show of AEW Redemption",
            why: "Shows what might happen at AEW Redemption if Kevin Knight wins (Jet 2 Belts)",
            where: "AEW Dynamite — Jul 22",
            youtubeId: "Zj4QmZo5goE"
          }
        ],
      },
      {
        id: "womens-world",
        wrestlers: ["Thekla (c)", "Willow Nightingale"],
        championship: "AEW Women's World Championship",
        stakes: "Casino Gauntlet winner vs the champion",
        teaser: "Willow’s shot — and Mercedes Moné is already lurking.",
        storySections: [
          {
            heading: "How Willow got the shot",
            body: "Returning from a shoulder injury at Beach Break, Willow Nightingale won a Casino Gauntlet to earn a Women’s World Championship match against Thekla at Redemption.",
          },
          {
            heading: "Thekla’s reign",
            body: "Thekla is one of the division’s most dangerous champions — control and menace versus Willow’s heart-and-fight babyface energy.",
          },
          {
            heading: "All In shadow",
            body: "After the Gauntlet, Owen Hart Cup winner Mercedes Moné attacked both Willow and Thekla. Whoever leaves Montreal with the title is already on Mercedes’ radar for All In.",
          },
          {
            heading: "The face off",
            body: "At AEW Dynamite (Jul 22), the champion and the challenger faced off, hosted by Mick Foley. The interaction got heated after Thekla disrespected Mick Foley and smacked WIllow in the head with her glove and then spiked Willow with the mic.",
          },
        ],
        watch: [
          {
            title: "Casino Gauntlet + Mercedes attack",
            why: "Explains Willow’s shot and the next threat.",
            where: "Dynamite: Beach Break — Jul 8",
            youtubeId: "l8a3yMI8QfQ",
          },
          {
            title: "Willow Nightingale and Thekla's face off",
            why: "Builds up the fight",
            where: "Dynamite (Jul 22)",
            youtubeId: "XDdjjK3TrlQ"
          }
        ],
      },
      {
        id: "tag-titles",
        wrestlers: [
          "Cope & Christian (Adam Copeland & Christian Cage) (c)",
          "Death Riders (Claudio Castagnoli & PAC)",
        ],
        championship: "AEW World Tag Team Championship",
        stakes: "Champions go on offense against Death Riders muscle",
        teaser: "Tired of the beatdowns — Cope & Cage call out Claudio & PAC.",
        storySections: [
          {
            heading: "Death Riders pressure",
            body: "Adam Copeland and Christian Cage have been absorbing attacks from the Dogs which is an ally of Death Riders. Instead of staying on defense, they called out The Death Riders to challenge them for the tag titles at Redemption.",
          },
          {
            heading: "The Death Riders answered",
            body: "PAC and Claudio Castagnoli has answered the challenge at the backstage segment of AEW Dynamite (Jul 22) where they immediately assaulted Christian Cage and Adam Copeland.",
          },
        ],
        watch: [
          {
            title: "Recent Death Riders and The Dogs attack on the champs",
            why: "Makes the title match feel like payback.",
            youtubeId: "-RBTRrsa8wI"
          },
          {
            title: "AEW Dynamite Backstage Segment",
            why: "Where the real grudge sets in",
            youtubeId: "grFVOyHdsbo"
          },
        ],
      },
      {
        id: "international-title",
        wrestlers: ["Kyle Fletcher (c)", "Bandido"],
        championship: "AEW International Championship",
        stakes: "International gold vs ROH World Champion heat",
        teaser: "Fletcher’s annoyance with Bandido turns into a title match.",
        storySections: [
          {
            heading: "Fletcher’s defense",
            body: "On the Jul 15 Dynamite, International Champion Kyle Fletcher retained against Komander, then tried to unmask him. Chaos spilled into Takeshita and Okada before Bandido wiped out Fletcher and Okada.",
          },
          {
            heading: "The challenge",
            body: "That collision was enough — Fletcher challenged ROH World Champion Bandido for the International title at Redemption.",
          },
          {
            heading: "The preview",
            body: `On the Jul 22 episode of AEW Dynamite, "The Protostar" Kyle Fletcher teamed with his stablemate "The Rainmaker" Kazuchika Okada in the "ProtOkada" against the team of Brody King and Bandido, "Brodido". Kazuchika Okada mistakenly hit Kyle Fletcher with his finisher, The Rainmaker, which makes Bandido to be able to get the pin on The Protostar. Will there be a rift on Kazuchika Okada and Kyle Fletcher?`
          }
        ],
        watch: [
          {
            title: "Fletcher vs Komander International Title Match and Post Match",
            why: "Shows how the title match got made.",
            where: "AEW Dynamite - Jul 15",
            youtubeId: "WAv6LTPiBpw"
          },
          {
            title: "ProtOkada vs Brodido match highlights",
            why: "The preview of the Redemption match",
            where: "AEW Dynamite - Jul 22",
            youtubeId: "p5ryAl5rFvI"
          },
        ],
      },
      // {
      //   id: "international-ladder",
      //   wrestlers: [
      //     "Komander",
      //     '"Jungle" Jack Perry',
      //     "Speedball Mike Bailey",
      //     "The Beast Mortos",
      //     "Nick Wayne / AR Fox",
      //     "Lio Rush / El Clon",
      //   ],
      //   championship: "AEW International Championship",
      //   stakes: "Ladder match for a future International title shot",
      //   teaser: "Místico’s injury opened the #1 contender spot.",
      //   storySections: [
      //     {
      //       heading: "The original plan",
      //       body: "After Redemption’s Fletcher vs Bandido match, Místico was supposed to be next in line for the International Championship.",
      //     },
      //     {
      //       heading: "What changed",
      //       body: "After the Jul 22 Dynamite, Místico was not cleared from an injury at CMLL Arena México. The #1 contender spot opened up.",
      //     },
      //     {
      //       heading: "Why this ladder match",
      //       body: "A multi-person ladder match decides who becomes the next challenger for the International title.",
      //     },
      //   ],
      //   watch: [
      //     {
      //       title: "Místico injury / contender shake-up",
      //       why: "Explains why the ladder match exists.",
      //       where: "AEW Dynamite — Jul 22",
      //     },
      //   ],
      // },
      {
        id: "national-title",
        wrestlers: ["Mark Davis (c)", "Andrade El Ídolo"],
        championship: "AEW National Championship",
        stakes: "Andrade wants to hurt the Callis Family by taking their gold",
        teaser: "Spurned by Callis — Andrade goes through Dunkzilla.",
        storySections: [
          {
            heading: "Andrade’s motive",
            body: "Andrade El Ídolo feels spurned by the Don Callis Family. His answer: take one of their championships and do real damage to the group.",
          },
          {
            heading: "How he got the shot",
            body: "On the Jul 15 Dynamite, Andrade beat Jake Doyle to earn a National Championship match against Mark Davis at Redemption.",
          },
          {
            heading: "The obstacle",
            body: "Don Callis made sure the path runs through “Dunkzilla” Mark Davis — a grind of a champion built to punish anyone hunting Callis Family gold.",
          },
        ],
        watch: [
          {
            title: "Andrade earns the shot",
            why: "Sets up Davis vs Andrade at Redemption.",
            where: "AEW Dynamite — Jul 15",
            youtubeId: "DPU3rtTW53c"
          },
        ],
      },
      {
        id: "tbs-title",
        wrestlers: ["Hikaru Shida (c)", "Maya World"],
        championship: "TBS Championship",
        stakes: "Title match born from a messy TV finish and a save",
        teaser: "Shida cheated to retain — Maya made it personal.",
        storySections: [
          {
            heading: "The dirty retention",
            body: "Hikaru Shida retained the TBS Championship over Queen Aminata with her feet on the ropes for leverage on a roll-up.",
          },
          {
            heading: "The beatdown",
            body: "After the bell, Shida treated Aminata like a piñata with a kendo stick. Maya World ran in for the save.",
          },
          {
            heading: "Why Maya gets the match",
            body: "That save was enough for AEW to book Maya World vs Shida for the TBS title at Redemption.",
          },
        ],
        watch: [
          {
            title: "Shida vs Aminata + Maya save",
            why: "The entire reason this title match exists.",
            where: "Collision - Jul 18",
            youtubeId: "g59oRdSbG1M"
          },
        ],
      },
      {
        id: "death-riders-vs-bucks",
        wrestlers: [
          "Death Riders (Will Ospreay & Jon Moxley)",
          "The Young Bucks (Matt Jackson & Nick Jackson)",
        ],
        stakes: "Faction war — prove who Kenny can trust",
        teaser: "The Bucks try to expose the Death Riders before All In.",
        storySections: [
          {
            heading: "Why the Bucks care",
            body: "Kenny Omega is AEW World Champion again after beating MJF at Beach Break (Jul 8). The Young Bucks want the Elite back on top and another run at the tag titles. They also don’t trust Will Ospreay now that he’s with the Death Riders.",
          },
          {
            heading: "The spark",
            body: "After the Bucks helped present Omega with the title, Ospreay asked them to leave. To Matt and Nick, it felt like a Death Riders setup. They’ve been allies and enemies with Mox before — and they say they know how that group works.",
          },
          {
            heading: "Collision (Jul 18)",
            body: "The Bucks challenged Moxley and Ospreay at Redemption to show Kenny he can’t trust a Death Rider. Mox accepted, calling it personal and admitting he’s always had disdain for “all things Elite.”",
          },
          {
            heading: "The clash",
            body: `After the main event of the Jul 22 episode of AEW Dynamite, Kenny Omega tried to straighten things up with Mox after he mistakenly hit Mox with a V-Trigger. They proceed to have a push off with Will Ospreay trying to separate them but got pushed by Kenny instead. The Young Bucks then tried to support Kenny Omega and it turned out to be a huge brawl in the ring.`,
          },
        ],
        watch: [
          {
            title: "Bucks present the title to Omega",
            why: "The moment that made the Bucks smell a setup.",
            where: "AEW Dynamite - Jul 15",
            youtubeId: "8HV2sjQeh-8"
          },
          {
            title: "Mox & Ospreay accepts",
            why: "Locks the match and the trust angle.",
            where: "AEW Collision - Jul 18",
            youtubeId: "EOSI6By4raA"
          },
          {
            title: "Main event post match",
            why: "The last brawl before the match",
            where: "AEW Dynamite - Jul 22",
            youtubeId: "mmkVApUp1g0?t=353"
          },
        ],
      },
      {
        id: "jericho-ciampa",
        wrestlers: ["Chris Jericho (The Painmaker)", "Tommaso Ciampa"],
        stakes: "No Holds Barred grudge rematch",
        teaser: "Painmaker vs Psycho Killer — no rules.",
        storySections: [
          {
            heading: "Beach Break (Jul 8)",
            body: "Ciampa beat Jericho with a dirty finish — sand in the eyes, then a running knee. After the bell he kept attacking with chairs and teased a drill before officials pulled him off. Jericho asked for round two at Redemption.",
          },
          {
            heading: "Dynamite (Jul 15)",
            body: "Jericho answered by bringing back the Painmaker — a darker, more aggressive version of himself — and told Ciampa that “Hell is coming.” Ciampa stayed calm and cocky: Redemption would settle who’s better, the Painmaker or the Psycho Killer.",
          },
          {
            heading: "Collision (Jul 18)",
            body: "After beating Myron Reed, Ciampa went to Paul Wight at the announce table and made the stipulation official: No Holds Barred.",
          },
        ],
        watch: [
          {
            title: "Beach Break finish + post-match heat",
            why: "Shows why this rematch feels personal.",
            where: "Dynamite: Beach Break — Jul 8",
            youtubeId: "jffQcqkJETM"
          },
          {
            title: "Painmaker return promo",
            why: "Sets Jericho’s tone going into Redemption.",
            where: "AEW Dynamite — Jul 15",
            youtubeId: "cvoUDfZVlHk"
          },
          {
            title: "Tommaso Ciampa gives message to Paul Wight for No Holds Barred Match",
            why: "Sets the stipulation",
            where: "AEW Collision — Jul 18",
            youtubeId: "hZPs4v2eCnQ"
          },
        ],
      },
      {
        id: "double-chain",
        wrestlers: [
          "Bang Bang Gang",
          "The Dogs",
        ],
        stakes: "Double Chain tag match — faction blood feud",
        teaser: "White’s return war with The Dogs gets a stipulation.",
        storySections: [
          {
            heading: "The feud so far",
            body: "Switchblade Jay White returned at Forbidden Door and hit Finlay with a Blade Runner during The Dogs’ tag title challenge - helping Cope & Christian retain.",
          },
          {
            heading: "Dynamite (Jul 22)",
            body: "White beat Clark Connors in singles. Post-match chaos followed: Connors kept fighting, Finlay cracked White with the shillelagh, and the Bang Bang Gang made the save with Juice carrying a chain.",
          },
          {
            heading: "The challenge",
            body: "Robinson challenged Finlay and Connors to a Double Chain tag match at Redemption.",
          },
        ],
        watch: [
          {
            title: "White vs Connors + post-match brawl",
            why: "Shows why the double chain stipulation exists.",
            where: "AEW Dynamite — Jul 22",
            youtubeId: "FIg7-HDXOMw"
          },
        ],
      },
    ],
    afterShow:
      "Will be updated after the show",
  },
};

export function getCard(promotionSlug: string, eventSlug: string) {
  return cards[`${promotionSlug}/${eventSlug}`];
}

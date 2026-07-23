"use client";

import { useEffect, useRef, useState } from "react";
import type { CardMatch } from "../content/cards";
import { WatchItemList } from "./WatchItemList";

type MatchCardListProps = {
  matches: CardMatch[];
};

function MatchDetail({
  match,
  index,
}: {
  match: CardMatch;
  index: number;
}) {
  return (
    <div className="border-l-2 border-feature pl-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Match {index + 1}
        {match.championship ? ` · ${match.championship}` : ""}
      </p>

      <h3 className="mt-3 text-xl font-semibold leading-snug text-cream md:text-2xl">
        {match.wrestlers.join(" vs ")}
      </h3>

      <p className="mt-3 text-sm font-semibold text-feature md:text-base">
        {match.stakes}
      </p>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-feature">
          Need to know
        </p>

        <div className="mt-4 space-y-6">
          {match.storySections.map((section) => (
            <section key={section.heading}>
              <h4 className="text-sm font-semibold text-cream md:text-base">
                {section.heading}
              </h4>
              <p className="mt-2 text-justify text-base leading-7 text-cream/90">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>

      {match.watch && match.watch.length > 0 ? (
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-feature">
            Watch before the bell
          </p>

          <WatchItemList items={match.watch} />
        </div>
      ) : null}
    </div>
  );
}

export function MatchCardList({ matches }: MatchCardListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    matches[0]?.id ?? null,
  );
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  const skipInitialScroll = useRef(true);

  useEffect(() => {
    if (skipInitialScroll.current) {
      skipInitialScroll.current = false;
      return;
    }

    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    selectedItemRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedId]);

  if (matches.length === 0) {
    return (
      <p className="mt-10 text-sm text-muted">
        Matches coming soon — UI shell is ready.
      </p>
    );
  }

  const selected =
    matches.find((match) => match.id === selectedId) ?? matches[0];
  const selectedIndex = matches.findIndex((match) => match.id === selected.id);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-14 lg:items-start">
      <ol className="space-y-5">
        {matches.map((bout, index) => {
          const isSelected = bout.id === selected.id;

          return (
            <li
              key={bout.id}
              ref={isSelected ? selectedItemRef : null}
              className="scroll-mt-24"
            >
              <button
                type="button"
                onClick={() => setSelectedId(bout.id)}
                aria-pressed={isSelected}
                aria-expanded={isSelected}
                className={`w-full border-l-2 pl-5 text-left transition ${
                  isSelected
                    ? "border-feature"
                    : "border-accent hover:border-feature"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Match {index + 1}
                  {bout.championship ? ` · ${bout.championship}` : ""}
                </p>

                <ul className="mt-2 space-y-1">
                  {bout.wrestlers.map((name, i) => (
                    <li key={`${bout.id}-${name}`}>
                      {i > 0 ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-feature">
                          vs
                        </p>
                      ) : null}
                      <h3
                        className={`text-base font-semibold leading-snug sm:text-lg md:text-xl ${
                          isSelected ? "text-cream" : ""
                        }`}
                      >
                        {name}
                      </h3>
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-sm font-semibold text-feature">
                  {bout.stakes}
                </p>

                {bout.teaser ? (
                  <p className="mt-2 text-sm text-muted">{bout.teaser}</p>
                ) : null}

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-feature lg:hidden">
                  {isSelected ? "Catch-up open ↓" : "Tap for catch-up →"}
                </p>
              </button>

              {isSelected ? (
                <div className="mt-5 border-t border-white/10 pt-5 lg:hidden">
                  <MatchDetail match={bout} index={index} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      <aside className="hidden w-full max-w-xl lg:sticky lg:top-28 lg:block lg:pl-8">
        <MatchDetail match={selected} index={selectedIndex} />
      </aside>
    </div>
  );
}

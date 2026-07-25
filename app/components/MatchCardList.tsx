"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CardMatch } from "../content/cards";
import { WatchItemList } from "./WatchItemList";
import { XEmbed } from "./XEmbed";

type MatchCardListProps = {
  matches: CardMatch[];
};

function getPreviewMedia(match: CardMatch) {
  const watch = match.watch;

  const withX = watch?.find((item) => item.xStatusUrl);
  if (withX?.xStatusUrl) {
    return {
      kind: "x" as const,
      xStatusUrl: withX.xStatusUrl,
      title: withX.title,
    };
  }

  if (match.previewImageUrl) {
    return {
      kind: "image" as const,
      imageUrl: match.previewImageUrl,
      title: match.wrestlers.join(" vs "),
    };
  }

  const withYoutube = watch?.find((item) => item.youtubeId);
  if (withYoutube?.youtubeId) {
    return {
      kind: "youtube" as const,
      youtubeId: withYoutube.youtubeId,
      title: withYoutube.title,
    };
  }

  return null;
}

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

function MatchVideoCard({
  match,
  index,
  isSelected,
  onSelect,
}: {
  match: CardMatch;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const preview = getPreviewMedia(match);

  return (
    <div
      className={`overflow-hidden border transition ${
        isSelected
          ? "border-feature"
          : "border-white/15 hover:border-feature/70"
      }`}
    >
      <div className="relative aspect-video bg-black/50">
        {preview?.kind === "x" ? (
          <div className="pointer-events-none absolute inset-0">
            <XEmbed
              statusUrl={preview.xStatusUrl}
              compact
              autoplay={isSelected}
            />
          </div>
        ) : preview?.kind === "image" ? (
          <Image
            src={preview.imageUrl}
            alt={preview.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        ) : preview?.kind === "youtube" ? (
          <iframe
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            src={
              isSelected
                ? `https://www.youtube-nocookie.com/embed/${preview.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${preview.youtubeId}`
                : `https://www.youtube-nocookie.com/embed/${preview.youtubeId}?controls=0&modestbranding=1&rel=0&playsinline=1`
            }
            title={preview.title}
            loading={isSelected ? "eager" : "lazy"}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1510] via-[#2a2018] to-black">
            <p className="px-4 text-center text-sm font-semibold text-cream/80">
              Catch-up
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onSelect}
          aria-pressed={isSelected}
          aria-expanded={isSelected}
          aria-label={`Open catch-up for ${match.wrestlers.join(" vs ")}`}
          className="absolute inset-0 z-10"
        />
      </div>

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isSelected}
        className="w-full border-t border-white/10 bg-black/30 px-4 py-3 text-left transition hover:bg-black/45"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-feature">
          Match {index + 1}
          {match.championship ? ` · ${match.championship}` : ""}
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-cream md:text-base">
          {match.wrestlers.join(" vs ")}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-feature lg:hidden">
          {isSelected ? "Catch-up open ↓" : "Tap for catch-up →"}
        </p>
      </button>
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
              <MatchVideoCard
                match={bout}
                index={index}
                isSelected={isSelected}
                onSelect={() => setSelectedId(bout.id)}
              />

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

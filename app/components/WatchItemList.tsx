import type { WatchItem } from "../content/cards";
import { YouTubeEmbed } from "./YouTubeEmbed";

type WatchItemListProps = {
  items: WatchItem[];
};

export function WatchItemList({ items }: WatchItemListProps) {
  return (
    <ul className="mt-4 space-y-6">
      {items.map((item) => (
        <li key={item.title}>
          <p className="text-sm font-semibold text-cream md:text-base">
            {item.title}
          </p>
          <p className="mt-1 text-justify text-sm leading-relaxed text-muted">
            {item.why}
          </p>
          {item.where ? (
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-feature">
              {item.where}
            </p>
          ) : null}
          {item.youtubeId ? (
            <YouTubeEmbed videoId={item.youtubeId} title={item.title} />
          ) : item.xStatusUrl ? (
            <a
              href={item.xStatusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-feature underline-offset-2 hover:underline"
            >
              Watch on X ↗
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

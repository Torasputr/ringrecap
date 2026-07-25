"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type XEmbedProps = {
  statusUrl: string;
  /** Hide the “Open on X” helper link (useful inside match list cards) */
  compact?: boolean;
  /** Start muted playback (left-card previews) */
  autoplay?: boolean;
};

type ResolvedVideo = {
  videoUrl: string;
  thumbnailUrl: string | null;
};

function getStatusId(url: string) {
  const match = url.match(
    /https?:\/\/(?:www\.)?(?:x|twitter)\.com\/[^/]+\/status\/(\d+)/i,
  );
  return match?.[1] ?? null;
}

/**
 * Left-card X previews use a native muted <video> (X’s iframe ignores mute).
 * Non-compact mode is a simple “Open on X” link.
 */
export function XEmbed({
  statusUrl,
  compact = false,
  autoplay = false,
}: XEmbedProps) {
  const statusId = getStatusId(statusUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [media, setMedia] = useState<ResolvedVideo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!compact || !statusId) return;

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/x-video/${statusId}`);
        if (!res.ok) {
          if (!cancelled) setFailed(true);
          return;
        }
        const data = (await res.json()) as ResolvedVideo;
        if (!cancelled) setMedia(data);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [compact, statusId]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !media) return;

    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;

    if (autoplay) {
      void el.play().catch(() => {
        // Autoplay can still fail on some browsers; poster stays visible.
      });
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [autoplay, media]);

  if (!statusId) {
    return (
      <a
        href={statusUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-feature underline-offset-2 hover:underline"
      >
        Watch on X ↗
      </a>
    );
  }

  if (!compact) {
    return (
      <a
        href={`https://x.com/i/status/${statusId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-feature underline-offset-2 hover:underline"
      >
        Open video on X ↗
      </a>
    );
  }

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black/60">
        <p className="px-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-cream/70">
          Clip preview unavailable
        </p>
      </div>
    );
  }

  if (!media) {
    return <div className="h-full w-full bg-black/40" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {media.thumbnailUrl ? (
        <Image
          src={media.thumbnailUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority={autoplay}
        />
      ) : null}
      {autoplay ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={media.videoUrl}
          muted
          defaultMuted
          playsInline
          autoPlay
          loop
          preload="auto"
          controls={false}
        />
      ) : null}
    </div>
  );
}

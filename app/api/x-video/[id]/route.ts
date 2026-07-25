import { NextResponse } from "next/server";

type FxFormat = {
  url?: string;
  bitrate?: number;
  container?: string;
  content_type?: string;
};

type FxVideo = {
  url?: string;
  thumbnail_url?: string;
  formats?: FxFormat[];
  variants?: FxFormat[];
};

function pickMp4(video: FxVideo) {
  const candidates = [...(video.formats ?? []), ...(video.variants ?? [])]
    .filter((f): f is FxFormat & { url: string } => {
      if (!f.url) return false;
      if (f.container === "mp4") return true;
      if (f.content_type === "video/mp4") return true;
      return f.url.includes(".mp4");
    })
    .sort((a, b) => (a.bitrate ?? 0) - (b.bitrate ?? 0));

  // Prefer ~720p-ish for card previews (not the 1080p giant)
  const preferred =
    candidates.find((f) => (f.bitrate ?? 0) >= 1_500_000 && (f.bitrate ?? 0) <= 3_000_000) ??
    candidates.find((f) => (f.bitrate ?? 0) >= 800_000) ??
    candidates[candidates.length - 1];

  return preferred?.url ?? video.url ?? null;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid status id" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.fxtwitter.com/status/${id}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not resolve X video" },
        { status: res.status },
      );
    }

    const data = (await res.json()) as {
      tweet?: { media?: { videos?: FxVideo[] } };
    };
    const video = data.tweet?.media?.videos?.[0];
    if (!video) {
      return NextResponse.json({ error: "No video on status" }, { status: 404 });
    }

    const videoUrl = pickMp4(video);
    if (!videoUrl) {
      return NextResponse.json({ error: "No mp4 variant" }, { status: 404 });
    }

    return NextResponse.json({
      videoUrl,
      thumbnailUrl: video.thumbnail_url ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch X video" },
      { status: 502 },
    );
  }
}

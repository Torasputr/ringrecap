"use client";

import { useEffect, useState } from "react";

type EventLocalTimesProps = {
  buyInAt?: string;
  startsAt?: string;
  /** Shown before JS hydrates / if formatting fails */
  fallback?: string;
};

function formatLocalDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatGmtOffset(date: Date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;

  if (minutes === 0) return `GMT${sign}${hours}`;
  return `GMT${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}

function formatLocalTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;

  const clock = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  return `${clock} ${formatGmtOffset(date)}`;
}

export function EventLocalDate({
  startsAt,
  fallback,
}: {
  startsAt?: string;
  fallback: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!startsAt) return <span>{fallback}</span>;
  if (!ready) return <span className="text-muted">{fallback}</span>;

  return <span>{formatLocalDate(startsAt) ?? fallback}</span>;
}

export function EventLocalTimes({
  buyInAt,
  startsAt,
  fallback,
}: EventLocalTimesProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!buyInAt && !startsAt) {
    return fallback ? <span>{fallback}</span> : null;
  }

  if (!ready) {
    return (
      <span className="text-muted">{fallback ?? "Detecting your local time…"}</span>
    );
  }

  const buyInLocal = buyInAt ? formatLocalTime(buyInAt) : null;
  const startLocal = startsAt ? formatLocalTime(startsAt) : null;

  return (
    <div className="space-y-1">
      {buyInLocal ? <p>Buy-In · {buyInLocal}</p> : null}
      {startLocal ? <p>PPV · {startLocal}</p> : null}
    </div>
  );
}

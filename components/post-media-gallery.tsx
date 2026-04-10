"use client";

import { useMemo, useState } from "react";

type MediaItem = {
  url: string;
  isVideo: boolean;
};

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

export function PostMediaGallery({ mediaUrls }: { mediaUrls: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = useMemo<MediaItem[]>(
    () => mediaUrls.map((url) => ({ url, isVideo: isVideoUrl(url) })),
    [mediaUrls]
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.slice(0, 4).map((item, index) => (
          <button
            key={item.url}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative overflow-hidden rounded-xl border border-border bg-slate-100"
          >
            {item.isVideo ? (
              <video src={item.url} className="h-44 w-full object-cover" muted playsInline />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt="Post media" className="h-44 w-full object-cover" loading="lazy" />
            )}
            {index === 3 && items.length > 4 ? (
              <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-lg font-semibold text-white">
                +{items.length - 4}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      {activeIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => setActiveIndex(null)}>
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-black" onClick={(event) => event.stopPropagation()}>
            {items[activeIndex]?.isVideo ? (
              <video src={items[activeIndex].url} controls autoPlay className="max-h-[70vh] w-full object-contain" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={items[activeIndex]?.url} alt="Expanded media" className="max-h-[70vh] w-full object-contain" />
            )}
            <div className="flex items-center justify-between bg-white px-4 py-3 text-sm">
              <span>
                {activeIndex + 1} / {items.length}
              </span>
              <button type="button" onClick={() => setActiveIndex(null)} className="rounded-lg bg-slate-100 px-3 py-1 font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

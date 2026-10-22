"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/data/site-content";

export function YouTubeEmbed({
  video,
  priority = false,
}: {
  video: Video;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="w-full">
      <div className="relative aspect-video bg-secondary">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 cursor-pointer text-left transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985]"
            aria-label={`Play ${video.title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
              preload={priority}
            />
            <span className="absolute inset-0 bg-[#14171f]/25 transition-opacity duration-200 group-hover:bg-[#14171f]/10" />
            <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center bg-primary text-primary-foreground transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-95">
              <svg viewBox="0 0 24 24" className="ml-1 size-7" aria-hidden="true">
                <path fill="currentColor" d="M8 5.5v13l11-6.5L8 5.5Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 max-w-3xl text-base">{video.title}</figcaption>
    </figure>
  );
}

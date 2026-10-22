"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/data/site-content";
import { YouTubeEmbed } from "@/components/media/youtube-embed";

export function VideoProgramme({ videos }: { videos: Video[] }) {
  const [activeId, setActiveId] = useState(videos[0]?.id);
  const active = videos.find((video) => video.id === activeId) ?? videos[0];

  if (!active) return null;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.7fr)]">
      <YouTubeEmbed key={active.id} video={active} priority />
      <ol className="flex flex-col">
        {videos.map((video) => {
          const selected = video.id === active.id;
          return (
            <li key={video.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(video.id)}
                className={`flex w-full items-center gap-3 p-2 text-left text-base leading-snug transition-[transform,color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] ${
                  selected ? "bg-background text-primary" : "text-foreground"
                }`}
              >
                <span className="relative aspect-video w-28 shrink-0 overflow-hidden bg-secondary">
                  <Image
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </span>
                {video.title}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

import type { Metadata } from "next";
import { VideoProgramme } from "@/components/music/video-programme";
import { musicVideos, socials, spotify } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Music",
  description: "Spotify, Apple Music, Bandcamp and live films from Udi Shlomo.",
};

const listenOrder = ["YouTube", "Spotify", "Bandcamp", "Apple Music"] as const;
const listen = listenOrder.flatMap((label) => socials.filter((item) => item.label === label));

export default function MusicPage() {
  return (
    <>
      <section className="shell py-16 sm:py-24">
        <iframe
          className="mt-8 h-[352px] w-full"
          src={spotify.embedUrl}
          title="Udi Shlomo on Spotify"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-lg">
          {listen.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-transform duration-150 active:scale-[0.97]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card">
        <div className="shell py-16 sm:py-24">
          <h2 className="text-display-2 max-w-[12ch]">Watch a set</h2>
          <div className="mt-10">
            <VideoProgramme videos={musicVideos} />
          </div>
        </div>
      </section>
    </>
  );
}

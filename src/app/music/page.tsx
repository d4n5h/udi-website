import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import { SocialIcon } from "@/components/layout/social-links";
import { VideoProgramme } from "@/components/music/video-programme";
import { Button } from "@/components/ui/button";
import { musicVideos, socials, spotify } from "@/data/site-content";

export const metadata = pageMetadata("music");

const listenOrder = ["YouTube", "Spotify", "Bandcamp", "Apple Music"] as const;
const listen = listenOrder.flatMap((label) => socials.filter((item) => item.label === label));

export default function MusicPage() {
  return (
    <>
      <PageStructuredData page="music" />
      <section className="shell pt-12 pb-8 sm:pt-16">
        <h1 className="text-4xl leading-tight sm:text-5xl">Music</h1>
        <div className="mt-8 overflow-hidden">
          <iframe
            className="-m-3 h-[732px] w-[calc(100%+1.5rem)] max-w-none border-0 bg-[#111111]"
            src={spotify.embedUrl}
            title="Udi Shlomo on Spotify"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="bg-secondary">
        <ul className="flex flex-wrap items-center justify-center gap-3 px-5 py-6 sm:gap-4 sm:py-8">
          {listen.map((item) => (
            <li key={item.label}>
              <Button asChild variant="secondary" className="bg-background">
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon label={item.label} className="size-5" />
                  {item.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card">
        <div className="shell py-12 sm:py-16">
          <h2 className="text-display-2 max-w-[12ch]">Watch a set</h2>
          <div className="mt-10">
            <VideoProgramme videos={musicVideos} />
          </div>
        </div>
      </section>
    </>
  );
}

import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { ReviewList } from "@/components/review-list";
import { Button } from "@/components/ui/button";
import { biography, epkDownload, epkVideos, reviews, site, socials } from "@/data/site-content";

export const metadata = pageMetadata("epk");

const epkReviews = reviews.filter((review) => review.epk);
const listen = socials.filter((item) =>
  ["Bandcamp", "YouTube", "Spotify", "Apple Music"].includes(item.label),
);

export default function EpkPage() {
  return (
    <>
      <PageStructuredData page="epk" />
      <section className="relative min-h-[calc(100svh-4.5rem)]">
        <Image
          src={assetPath("/images/hero-udi-wide.jpg")}
          alt="Udi Shlomo standing between two cymbals"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col justify-between p-5 sm:p-8">
          <h1 className="text-display-1 max-w-[14ch] text-[#f4f1ea]">
            Electronic press kit
          </h1>
          <p className="text-right text-[#f4f1ea]">Photograph by Bjørn Ánte Røe</p>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="max-w-3xl space-y-6">
          {biography.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="text-lg">Listen on:</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
            {listen.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-card">
        <div className="shell py-16 sm:py-24">
          <h2 className="text-display-2">Album review</h2>
          <div className="mt-10">
            <ReviewList reviews={epkReviews.filter((review) => review.id === "aubre")} />
          </div>
          <h2 className="text-display-2 mt-16">Jazzfest Brno concert review</h2>
          <div className="mt-10">
            <ReviewList reviews={epkReviews.filter((review) => review.id === "sykora")} />
          </div>
        </div>
      </section>

      <section className="shell grid gap-12 py-16 sm:py-24 lg:grid-cols-2">
        {epkVideos.map((video) => (
          <YouTubeEmbed key={video.id} video={video} />
        ))}
      </section>

      <section className="bg-card">
        <div className="shell flex flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-24">
          <div>
            <h2 className="text-display-2 max-w-[14ch]">Download the kit</h2>
            <p className="mt-4 text-lg">
              <a href={`mailto:${site.email}`} className="text-primary">
                {site.email}
              </a>
            </p>
            <p className="mt-1">
              <a href={site.phoneHref} className="tabular-nums">
                {site.phoneDisplay}
              </a>
            </p>
            <p className="mt-1">
              <a href={site.url}>{site.url.replace("https://", "")}</a>
            </p>
          </div>
          <Button asChild>
            <a href={epkDownload} target="_blank" rel="noopener noreferrer">
              Download Electronic Press Kit
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}

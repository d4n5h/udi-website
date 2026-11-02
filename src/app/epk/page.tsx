import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import { ArrowUpRight } from "lucide-react";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { PhotoHero } from "@/components/photo-hero";
import { ReviewList } from "@/components/review-list";
import { Button } from "@/components/ui/button";
import { biography, epkDownload, epkVideos, reviews, site, socials } from "@/data/site-content";

export const metadata = pageMetadata("epk");

const listen = socials.filter((item) =>
  ["Bandcamp", "YouTube", "Spotify", "Apple Music"].includes(item.label),
);
const press = [
  { title: "Album review", review: reviews.find((review) => review.id === "aubre") },
  { title: "Jazzfest Brno concert review", review: reviews.find((review) => review.id === "sykora") },
];
const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phoneDisplay, href: site.phoneHref },
  { label: "Website", value: site.url.replace("https://", "").replace(/\/$/, ""), href: site.url },
];

const row = "flex items-baseline justify-between gap-6 border-t border-border py-3.5";

function DownloadButton() {
  return (
    <Button asChild className="w-full">
      <a href={epkDownload} target="_blank" rel="noopener noreferrer">
        Download Electronic Press Kit
      </a>
    </Button>
  );
}

export default function EpkPage() {
  return (
    <>
      <PageStructuredData page="epk" />
      <PhotoHero
        title="Electronic press kit"
        subtitle="Udi Shlomo, drummer, composer and arranger."
        wave="#111111"
      />

      <section className="shell grid gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <h2 className="text-display-2">Biography</h2>
          <div className="mt-8 max-w-[65ch] space-y-6 text-lg leading-relaxed">
            {biography.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9 lg:pt-3">
          <h2 className="text-2xl leading-tight">Listen</h2>
          <ul className="mt-5 border-b border-border">
            {listen.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group text-lg ${row}`}
                >
                  {item.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 self-center text-muted-foreground transition-[translate,color] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <DownloadButton />
          </div>
        </aside>
      </section>

      <section className="bg-card">
        <div className="shell grid gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-6">
          {press.map(({ title, review }, index) =>
            review ? (
              <div
                key={review.id}
                className={index ? "lg:col-span-4 lg:col-start-9" : "lg:col-span-7"}
              >
                <h2 className="text-2xl leading-tight sm:text-3xl">{title}</h2>
                <div className="mt-6">
                  <ReviewList reviews={[review]} />
                </div>
              </div>
            ) : null,
          )}
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <h2 className="text-display-2">Videos</h2>
        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {epkVideos.map((video) => (
            <YouTubeEmbed key={video.id} video={video} />
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="shell grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-6">
          <h2 className="text-display-2 lg:col-span-7">Download the kit</h2>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <ul className="border-b border-border">
              {contacts.map((contact) => (
                <li key={contact.label} className={row}>
                  <span className="text-muted-foreground">{contact.label}</span>
                  <a
                    href={contact.href}
                    className="tabular-nums underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {contact.value}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <DownloadButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

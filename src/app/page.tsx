import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import Image from "next/image";
import Link from "next/link";
import { QuoteCarousel } from "@/components/home/quote-carousel";
import { FacebookPageEmbed } from "@/components/media/facebook-page-embed";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { Button } from "@/components/ui/button";
import { gallery, heroPhoto, reviews, videos } from "@/data/site-content";

export const metadata = pageMetadata("home");

const ferell = reviews.find((review) => review.id === "aubre");
const press = reviews.filter((review) => review.home && review.id !== "aubre");
const stage = gallery.find((photo) => photo.src.endsWith("udi-transform.jpg"));

function splitLead(quote: string) {
  const cut = quote.indexOf("” ") + 1;
  return cut ? [quote.slice(0, cut), quote.slice(cut + 1)] : [quote, ""];
}

export default function HomePage() {
  const [lead, rest] = ferell ? splitLead(ferell.quote) : ["", ""];

  return (
    <div className="overflow-x-clip">
      <PageStructuredData page="home" />
      <section className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-[-6.67%] left-0">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            preload
            sizes="107vw"
            className="object-cover object-[46.875%_40%]"
          />
        </div>
        <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col justify-end p-5 pb-14 sm:p-8 sm:pb-16">
          <h1 className="font-sans text-4xl font-medium leading-tight tracking-normal text-[#f4f1ea] sm:text-5xl">
            Udi Shlomo
          </h1>
          <p className="mt-3 max-w-xl text-lg text-[#f4f1ea] sm:text-xl">
            Drummer, composer and arranger, based in Trondheim.
          </p>
          <p className="mt-2 text-[#f4f1ea]">{heroPhoto.caption}</p>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-12 w-full sm:h-16"
        >
          <path fill="#050503" d="M0 48Q720 150 1440 48V160H0Z" />
        </svg>
      </section>

      {ferell ? (
        <section className="relative bg-[#050503] text-white selection:bg-white selection:text-[#050503]">
          <div className="shell relative z-10 grid items-start gap-12 pt-16 pb-24 lg:grid-cols-12 lg:gap-6 lg:pt-20 lg:pb-28">
            <div className="lg:col-span-7">
              <blockquote>
                <p className="text-statement">
                  “{lead}
                  {rest ? null : "”"}
                </p>
                {rest ? <p className="mt-6 max-w-[60ch] text-lg">{rest}”</p> : null}
                <footer className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span>
                    {ferell.author}, {ferell.publication}
                  </span>
                  {ferell.href ? (
                    <a
                      href={ferell.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Read the review
                    </a>
                  ) : null}
                </footer>
              </blockquote>
              <Button
                asChild
                className="mt-10 bg-white text-[#050503] hover:bg-white/85 focus-visible:ring-white/60"
              >
                <Link href="/music">Hear the music</Link>
              </Button>
            </div>
            {stage ? (
              <figure className="relative z-10 mx-auto w-2/3 sm:w-1/2 lg:col-span-3 lg:col-start-10 lg:w-full">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={stage.src}
                    alt={stage.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 50vw, 67vw"
                    className="object-cover object-[center_20%]"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm lg:text-left">
                  {stage.caption}
                </figcaption>
              </figure>
            ) : null}
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 w-full sm:h-20 lg:h-24"
          >
            <path d="M0 130Q720 50 1440 130V160H0Z" fill="#14171f" />
          </svg>
        </section>
      ) : null}

      <section className="relative">
        <div className="shell grid items-start gap-10 pt-16 pb-20 lg:grid-cols-12 lg:gap-6 lg:pt-24 lg:pb-32">
          <div className="lg:col-span-8">
            <h2 className="text-display-2">Jazzfest Brno, on film</h2>
            <div className="mt-8">
              <YouTubeEmbed video={videos.brno} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <FacebookPageEmbed />
          </div>
        </div>
      </section>

      <QuoteCarousel reviews={press} />
    </div>
  );
}

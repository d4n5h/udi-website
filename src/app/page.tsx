import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import Link from "next/link";
import { QuoteCarousel } from "@/components/home/quote-carousel";
import { UpcomingConcerts } from "@/components/home/upcoming-concerts";
import { FacebookPageEmbed } from "@/components/media/facebook-page-embed";
import { PhotoHero } from "@/components/photo-hero";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data/site-content";

export const metadata = pageMetadata("home");

const ferell = reviews.find((review) => review.id === "aubre");
const press = reviews.filter((review) => review.home && review.id !== "aubre");
function splitLead(quote: string) {
  const cut = quote.indexOf("” ") + 1;
  return cut ? [quote.slice(0, cut), quote.slice(cut + 1)] : [quote, ""];
}

export default function HomePage() {
  const [lead, rest] = ferell ? splitLead(ferell.quote) : ["", ""];

  return (
    <div className="overflow-x-clip">
      <PageStructuredData page="home" />
      <PhotoHero
        title="Udi Shlomo"
        subtitle="Drummer, composer and arranger, based in Trondheim."
        fade="#050503"
      />

      {ferell ? (
        <section className="relative bg-[#050503] text-white selection:bg-white selection:text-[#050503]">
          <div className="shell relative z-10 pt-16 pb-24 sm:pt-20 sm:pb-28">
            <blockquote>
              <p className="text-statement">
                “{lead}
                {rest ? null : "”"}
              </p>
              {rest ? <p className="mt-6 text-lg">{rest}”</p> : null}
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
            <Button asChild variant="light" className="mt-10">
              <Link href="/music">Hear the music</Link>
            </Button>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-linear-to-b from-transparent to-[#111111] sm:h-56 lg:h-72"
          />
        </section>
      ) : null}

      <UpcomingConcerts />
      <FacebookPageEmbed />

      <QuoteCarousel reviews={press} />
    </div>
  );
}

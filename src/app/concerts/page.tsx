import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import { ConcertDates } from "@/components/concerts/concert-dates";
import { loadConcertDates } from "@/lib/bandsintown";
import { bandsintown } from "@/data/site-content";

export const metadata = pageMetadata("concerts");

export default async function ConcertsPage() {
  const dates = await loadConcertDates();
  const upcoming = dates.ok ? dates.upcoming : [];
  const ways = [
    {
      label: "Request a show",
      note: "Ask for a concert in your city on Bandsintown.",
      href: dates.ok ? dates.requestUrl : bandsintown.pageUrl,
    },
    {
      label: "Get alerts for new dates",
      note: "Bandsintown lets you know when a show is announced.",
      href: dates.ok ? dates.trackUrl : bandsintown.pageUrl,
    },
    { label: "Booking enquiries", note: "For venues, festivals and promoters.", href: "/contact" },
  ];

  return (
    <>
      <PageStructuredData page="concerts" />
      {upcoming.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": upcoming.map((show) => ({
                "@type": "MusicEvent",
                name: show.title,
                startDate: show.date.iso,
                url: show.eventUrl,
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: {
                  "@type": "Place",
                  name: show.venue ?? show.title,
                  address: [show.address, show.place].filter(Boolean).join(", "),
                },
                performer: { "@id": siteUrl("#artist") },
                ...(show.ticketUrl
                  ? {
                      offers: {
                        "@type": "Offer",
                        url: show.ticketUrl,
                        availability: show.soldOut
                          ? "https://schema.org/SoldOut"
                          : "https://schema.org/InStock",
                      },
                    }
                  : {}),
              })),
            }).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <ConcertDates initial={dates} />

      <section className="bg-card">
        <div className="shell py-16 sm:py-20">
          <ul className="border-b border-border">
            {ways.map((way) => {
              const external = way.href.startsWith("http");
              const Icon = external ? ArrowUpRight : ArrowRight;
              const body = (
                <>
                  <span>
                    <span className="block">{way.label}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{way.note}</span>
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-[translate,color] duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </>
              );
              const className =
                "group flex items-center justify-between gap-6 border-t border-border py-4";
              return (
                <li key={way.label}>
                  {external ? (
                    <a href={way.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {body}
                    </a>
                  ) : (
                    <Link href={way.href} className={className}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

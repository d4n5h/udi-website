import Link from "next/link";
import { Button } from "@/components/ui/button";
import { loadConcertDates, type Show } from "@/lib/bandsintown";

const open = { target: "_blank", rel: "noopener noreferrer" } as const;

function place(show: Show) {
  return [show.venue, show.place].filter(Boolean).join(", ");
}

export async function UpcomingConcerts() {
  const dates = await loadConcertDates();
  const shows = dates.ok ? dates.upcoming.slice(0, 3) : [];

  return (
    <section className="shell pt-16 sm:pt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="inline-flex items-center gap-2.5 text-3xl">
          <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
            <path d="M0 0h24v24H0z" fill="none" />
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path d="M2.75 7.75a2 2 0 0 1 2-2h14.5a2 2 0 0 1 2 2V9.5a2.5 2.5 0 0 0 0 5v1.75a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2V14.5a2.5 2.5 0 0 0 0-5Zm13.5 0v.75m0 3v1m0 3v.75" />
              <circle cx="9" cy="14.25" r="1.5" />
              <path d="M10.5 14.25v-5.5l2.5 1" />
            </g>
          </svg>
          Upcoming concerts
        </h2>
        <Button asChild size="sm">
          <Link href="/concerts">All concerts</Link>
        </Button>
      </div>
      {shows.length ? (
        <ul className="mt-6 border-t border-border">
          {shows.map((show) => (
            <li
              key={show.id}
              className="grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3 border-b border-border py-4 sm:grid-cols-[8rem_1fr_auto] sm:gap-x-8"
            >
              <time dateTime={show.date.iso} className="tabular-nums">
                <span className="font-display text-2xl leading-none">{show.date.day}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{show.date.month}</span>
              </time>
              <div className="min-w-0">
                <p className="leading-tight">{show.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[show.date.weekday, show.date.time, place(show)].filter(Boolean).join(" · ")}
                </p>
              </div>
              {show.ticketUrl || show.rsvpUrl || show.soldOut ? (
                <div className="col-start-2 flex flex-wrap gap-2 sm:col-start-auto">
                  {show.ticketUrl ? (
                    <Button asChild size="sm">
                      <a href={show.ticketUrl} {...open}>
                        Tickets
                      </a>
                    </Button>
                  ) : null}
                  {show.rsvpUrl ? (
                    <Button asChild size="sm" variant={show.ticketUrl ? "secondary" : "default"}>
                      <a href={show.rsvpUrl} {...open}>
                        {show.ticketUrl ? "RSVP" : "Notify me"}
                      </a>
                    </Button>
                  ) : null}
                  {show.soldOut ? <p className="text-sm text-muted-foreground">Sold out</p> : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 border-t border-border pt-4 text-muted-foreground">
          {dates.ok ? "No dates announced right now." : "Dates could not be loaded."}
        </p>
      )}
    </section>
  );
}

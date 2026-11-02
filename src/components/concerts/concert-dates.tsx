"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MapPin } from "lucide-react";
import { bandsintown } from "@/data/site-content";
import { loadConcertDates, type ConcertData, type Show } from "@/lib/bandsintown";
import { Button } from "@/components/ui/button";

const link =
  "underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:decoration-foreground";
const open = { target: "_blank", rel: "noopener noreferrer" } as const;

const subscribe = () => () => {};
function today() {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}

function countdown(iso: string, from: number | null) {
  if (from === null) return null;
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  const days = Math.round((Date.UTC(year, month - 1, day) - from) / 86_400_000);
  if (days < 0 || days > 99) return null;
  return days === 0 ? "tonight" : days === 1 ? "tomorrow" : `in ${days} days`;
}

function Actions({ show }: { show: Show }) {
  if (!show.ticketUrl && !show.rsvpUrl && !show.soldOut) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {show.ticketUrl ? (
        <Button asChild>
          <a href={show.ticketUrl} {...open}>
            Tickets
          </a>
        </Button>
      ) : null}
      {show.rsvpUrl ? (
        <Button asChild variant={show.ticketUrl ? "secondary" : "default"}>
          <a href={show.rsvpUrl} {...open}>
            {show.ticketUrl ? "RSVP" : "Notify me"}
          </a>
        </Button>
      ) : null}
      {show.soldOut ? <p className="text-muted-foreground">Sold out</p> : null}
    </div>
  );
}

function Where({ show }: { show: Show }) {
  const where = [show.venue, show.place].filter(Boolean).join(", ");
  return (
    <>
      {where ? <p className="mt-1.5">{where}</p> : null}
      {show.with ? <p className="mt-1 text-muted-foreground">with {show.with}</p> : null}
      {show.mapUrl ? (
        <a
          href={show.mapUrl}
          {...open}
          className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <MapPin aria-hidden="true" className="size-3.5" />
          {show.address ?? "Map"}
        </a>
      ) : null}
    </>
  );
}

function NextShow({ show }: { show: Show }) {
  const from = useSyncExternalStore(subscribe, today, () => null);
  const meta = [show.date.weekday, show.date.time, countdown(show.date.iso, from)]
    .filter(Boolean)
    .join(" · ");
  return (
    <article className="mt-8 grid gap-6 border-y border-border py-7 sm:mt-10 sm:py-8 lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-10">
      <time dateTime={show.date.iso} className="flex items-end gap-3 lg:col-span-4">
        <span className="font-display text-5xl leading-[0.8] tracking-[-0.03em] tabular-nums">
          {show.date.day}
        </span>
        <span>
          <span className="block text-lg leading-tight">
            {show.date.month} {show.date.year}
          </span>
          {meta ? <span className="mt-0.5 block text-sm text-muted-foreground">{meta}</span> : null}
        </span>
      </time>
      <div className="lg:col-span-5">
        <h2 className="font-sans text-xl font-medium leading-tight tracking-normal">
          <a href={show.eventUrl} {...open} className={`${link} decoration-transparent`}>
            {show.title}
          </a>
        </h2>
        <Where show={show} />
      </div>
      <div className="lg:col-span-3 lg:justify-self-end">
        <Actions show={show} />
      </div>
    </article>
  );
}

function ShowRow({ show }: { show: Show }) {
  return (
    <li className="grid grid-cols-[4.5rem_1fr] items-center gap-x-5 gap-y-4 border-t border-border py-6 sm:grid-cols-[5.5rem_1fr_auto] sm:gap-x-10">
      <time dateTime={show.date.iso} className="tabular-nums">
        {show.date.weekday ? (
          <span className="block text-sm text-muted-foreground">{show.date.weekday}</span>
        ) : null}
        <span className="mt-1 block font-display text-3xl leading-none">{show.date.day}</span>
        <span className="mt-1 block text-sm text-muted-foreground">
          {show.date.month} {show.date.year}
        </span>
      </time>
      <div className="min-w-0">
        <a
          href={show.eventUrl}
          {...open}
          className={`text-lg leading-tight ${link} decoration-transparent`}
        >
          {show.title}
        </a>
        <Where show={show} />
      </div>
      <div className="col-start-2 sm:col-start-auto">
        <Actions show={show} />
      </div>
    </li>
  );
}

function Dates({ title, shows }: { title: string; shows: Show[] }) {
  if (!shows.length) return null;
  return (
    <section className="shell pb-16 sm:pb-20">
      <h2 className="text-3xl leading-tight">{title}</h2>
      <ul className="mt-6 border-b border-border">
        {shows.map((show) => (
          <ShowRow key={show.id} show={show} />
        ))}
      </ul>
    </section>
  );
}

export function ConcertDates({ initial }: { initial: ConcertData }) {
  const [data, setData] = useState(initial);
  const [settled, setSettled] = useState(initial.ok);

  useEffect(() => {
    let cancel = false;
    loadConcertDates()
      .then((next) => {
        if (!cancel && next.ok) setData(next);
      })
      .finally(() => {
        if (!cancel) setSettled(true);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const [next, ...more] = data.ok ? data.upcoming : [];

  return (
    <>
      <section className="shell pt-12 pb-16 sm:pt-16 sm:pb-20">
        <h1 className="text-4xl leading-tight sm:text-5xl">Concerts</h1>

        {next ? <NextShow show={next} /> : null}

        {data.ok && !next ? (
          <div className="mt-8 border-t border-border pt-7 sm:mt-10">
            <p className="text-lg">No dates announced right now.</p>
            <Button asChild className="mt-6">
              <a href={data.trackUrl} {...open}>
                Get alerts for new dates
              </a>
            </Button>
          </div>
        ) : null}

        {!data.ok ? (
          <p className="mt-8 border-t border-border pt-7 sm:mt-10">
            {settled ? (
              <>
                Dates could not be loaded.{" "}
                <a href={bandsintown.pageUrl} {...open} className={link}>
                  See them on Bandsintown.
                </a>
              </>
            ) : (
              "Loading dates…"
            )}
          </p>
        ) : null}
      </section>

      <Dates title="More dates" shows={more} />
      <Dates title="Past dates" shows={data.ok ? data.past : []} />
    </>
  );
}

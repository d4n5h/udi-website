import { bandsintown, site } from "@/data/site-content";

const appId = `js_${new URL(site.url).hostname}`;
const endpoint = `https://rest.bandsintown.com/V3.1/artists/${encodeURIComponent(bandsintown.artistName)}`;

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type RawOffer = { type?: string; url?: string; status?: string };

type RawEvent = {
  id?: string;
  url?: string;
  datetime?: string;
  title?: string;
  description?: string;
  artist_id?: string;
  sold_out?: boolean;
  datetime_display_rule?: string;
  starts_at?: string;
  ends_at?: string;
  festival_end_date?: string;
  venue?: {
    name?: string;
    location?: string;
    street_address?: string;
    postal_code?: string;
    city?: string;
    country?: string;
  };
  offers?: RawOffer[];
  lineup?: string[];
  artist?: { name?: string };
};

type RawArtist = { id?: string };

export type ShowDate = {
  day: string;
  month: string;
  year: number;
  weekday: string | null;
  iso: string;
  time: string | null;
};

export type Show = {
  id: string;
  title: string;
  venue: string | null;
  place: string;
  address: string | null;
  mapUrl: string | null;
  with: string | null;
  date: ShowDate;
  eventUrl: string;
  ticketUrl: string | null;
  rsvpUrl: string | null;
  soldOut: boolean;
};

export type ConcertData =
  | { ok: true; upcoming: Show[]; past: Show[]; trackUrl: string; requestUrl: string }
  | { ok: false };

function splitIso(iso: string) {
  const [date = "", time = ""] = iso.split("T");
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, month, day, date, hm: time.slice(0, 5) };
}

function when(event: RawEvent): ShowDate | null {
  const start = splitIso(event.starts_at || event.datetime || "");
  if (!start || !event.datetime) return null;
  const endIso = event.festival_end_date || event.ends_at || "";
  const end =
    event.datetime_display_rule === "range" || event.festival_end_date ? splitIso(endIso) : null;
  const ranged = Boolean(end && end.date !== start.date);
  const weekday = weekdays[new Date(start.year, start.month - 1, start.day).getDay()];
  const time =
    !ranged && event.datetime_display_rule !== "date" && start.hm && start.hm !== "00:00"
      ? start.hm
      : null;

  if (!ranged || !end) {
    return {
      day: String(start.day),
      month: months[start.month - 1],
      year: start.year,
      weekday,
      iso: event.datetime,
      time,
    };
  }

  const sameMonth = start.year === end.year && start.month === end.month;
  return {
    day: sameMonth ? `${start.day}–${end.day}` : String(start.day),
    month: sameMonth
      ? months[start.month - 1]
      : `${months[start.month - 1]} – ${end.day} ${months[end.month - 1]}`,
    year: end.year,
    weekday: null,
    iso: event.datetime,
    time: null,
  };
}

async function signature(artistId: string) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${artistId}--opt--0`),
  );
  const hex = [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `ZZ${hex}`;
}

function actionUrl(path: string, signed: string, extra: Record<string, string>) {
  const url = new URL(`https://www.bandsintown.com/${path}`);
  for (const [key, value] of Object.entries({
    app_id: appId,
    affil_code: appId,
    came_from: "267",
    signature: signed,
    spn: "0",
    utm_medium: "api",
    utm_source: "public_api",
    ...extra,
  })) {
    url.searchParams.set(key, value);
  }
  return url.href;
}

function toShow(event: RawEvent, artistId: string, signed: string, past: boolean): Show | null {
  const date = when(event);
  if (!event.id || !event.url || !date) return null;
  const title = event.title?.trim() || "";
  const venueName = event.venue?.name?.trim() || "";
  const ticket = event.offers?.find((offer) => offer.type === "Tickets" && offer.url);
  const names = new Set([bandsintown.artistName, event.artist?.name].filter(Boolean));
  const others = (event.lineup ?? []).filter((name) => !names.has(name));
  const street = event.venue?.street_address?.trim() || "";
  const town = [event.venue?.postal_code, event.venue?.city].filter(Boolean).join(" ");
  const mapQuery = [venueName, street, town, event.venue?.country].filter(Boolean).join(", ");
  return {
    id: event.id,
    title: title || venueName || bandsintown.artistName,
    venue: title && venueName ? venueName : null,
    place: event.venue?.location?.trim() || "",
    address: street || null,
    mapUrl:
      past || !mapQuery
        ? null
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    with: others.length ? others.join(", ") : null,
    date,
    eventUrl: event.url,
    ticketUrl: past || event.sold_out ? null : ticket?.url || null,
    rsvpUrl:
      past || event.sold_out
        ? null
        : actionUrl(`artist-rsvp/${artistId}`, signed, {
            event_id: event.id,
            utm_campaign: ticket?.url ? "rsvp" : "notify_me",
          }),
    soldOut: Boolean(event.sold_out),
  };
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(String(response.status));
  return response.json() as Promise<T>;
}

export async function loadConcertDates(): Promise<ConcertData> {
  try {
    const query = `app_id=${encodeURIComponent(appId)}`;
    const [artist, upcoming, past] = await Promise.all([
      getJson<RawArtist>(`${endpoint}?${query}`),
      getJson<RawEvent[]>(`${endpoint}/events/?${query}&date=upcoming`),
      getJson<RawEvent[]>(`${endpoint}/events/?${query}&date=past`),
    ]);
    if (!artist.id || !Array.isArray(upcoming) || !Array.isArray(past)) throw new Error("shape");
    const signed = await signature(artist.id);
    const shows = (events: RawEvent[], pastShow: boolean) =>
      events.flatMap((event) => {
        const show = toShow(event, artist.id!, signed, pastShow);
        return show ? [show] : [];
      });
    const next = shows(upcoming, false).sort((a, b) => a.date.iso.localeCompare(b.date.iso));
    const seen = new Set(next.map((show) => show.id));
    return {
      ok: true,
      upcoming: next,
      past: shows(past, true)
        .filter((show) => !seen.has(show.id))
        .sort((a, b) => b.date.iso.localeCompare(a.date.iso))
        .slice(0, 15),
      trackUrl: actionUrl(`artist-subscribe/${artist.id}`, signed, { utm_campaign: "track" }),
      requestUrl: actionUrl(`artist-subscribe/${artist.id}`, signed, {
        "play-my-city": "true",
        utm_campaign: "play_my_city",
      }),
    };
  } catch {
    return { ok: false };
  }
}

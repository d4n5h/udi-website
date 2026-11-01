import type { Metadata } from "next";
import { site } from "@/data/site-content";
import { shareCards, shareImagePath, type ShareCard } from "@/lib/share-image";

// Resolve relative to the site directory, preserving the GitHub Pages prefix.
export function siteUrl(path = "") {
  return new URL(path.replace(/^\/+/, ""), `${site.url.replace(/\/+$/, "")}/`).href;
}

export const seoPages = {
  home: {
    path: "",
    title: "Udi Shlomo | Jazz Drummer, Composer & Arranger",
    description: "Discover Udi Shlomo's world jazz: original music, live videos, concert dates and press. Drummer, composer and arranger based in Trondheim, Norway.",
    label: "Home",
    type: "WebPage",
  },
  about: {
    path: "about/",
    title: "Biography & Reviews | Udi Shlomo, Jazz Drummer",
    description: "Meet Udi Shlomo, a jazz drummer and composer from Kibbutz Nahshon, based in Trondheim. Read his biography, explore concert photos and discover press reviews.",
    label: "About",
    type: "ProfilePage",
  },
  music: {
    path: "music/",
    title: "Music & Live Videos | Udi Shlomo, Jazz Drummer",
    description: "Listen to Udi Shlomo on Spotify, Bandcamp and Apple Music. Watch live quintet performances and videos from the album You & Me.",
    label: "Music",
    type: "CollectionPage",
  },
  concerts: {
    path: "concerts/",
    title: "Concerts & Tour Dates | Udi Shlomo, Jazz Drummer",
    description: "Find Udi Shlomo's upcoming concerts and past performances. See live dates and venues, and follow Udi Shlomo Music on Bandsintown.",
    label: "Concerts",
    type: "CollectionPage",
  },
  contact: {
    path: "contact/",
    title: "Contact & Booking | Udi Shlomo, Jazz Drummer",
    description: "Contact Udi Shlomo for concert bookings, recording sessions and press enquiries. Email and phone for the drummer and composer in Trondheim, Norway.",
    label: "Contact",
    type: "ContactPage",
  },
  epk: {
    path: "epk/",
    title: "Electronic Press Kit (EPK) | Udi Shlomo, Jazz Drummer",
    description: "Udi Shlomo's electronic press kit: biography, album and concert reviews, live videos, booking contacts and downloadable press materials.",
    label: "Electronic press kit",
    type: "WebPage",
  },
} as const;

export type SeoPage = keyof typeof seoPages;

export function pageMetadata(key: SeoPage): Metadata {
  const { path, title, description } = seoPages[key];
  const card = shareCards[key as ShareCard];
  const image = {
    url: siteUrl(shareImagePath(key)),
    width: 1200,
    height: 630,
    alt: card.alt,
    type: "image/jpeg",
  };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: siteUrl(path) },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      ...(key === "about"
        ? { type: "profile" as const, firstName: "Udi", lastName: "Shlomo" }
        : { type: "website" as const }),
      ...(key === "contact" ? { emails: [site.email], phoneNumbers: [site.phoneDisplay] } : {}),
      locale: "en_GB",
      siteName: site.name,
      title,
      description,
      url: siteUrl(path),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

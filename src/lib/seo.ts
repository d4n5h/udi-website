import type { Metadata } from "next";
import { site } from "@/data/site-content";

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
    title: "Biography & Reviews | Udi Shlomo",
    description: "Meet Udi Shlomo, a jazz drummer and composer from Kibbutz Nahshon, based in Trondheim. Read his biography, explore concert photos and discover press reviews.",
    label: "About",
    type: "ProfilePage",
  },
  music: {
    path: "music/",
    title: "Music & Live Videos | Udi Shlomo",
    description: "Listen to Udi Shlomo on Spotify, Bandcamp and Apple Music. Watch live quintet performances and videos from You & Me, blending jazz and Jewish musical traditions.",
    label: "Music",
    type: "CollectionPage",
  },
  concerts: {
    path: "concerts/",
    title: "Concerts & Tour Dates | Udi Shlomo",
    description: "Find Udi Shlomo's upcoming concerts and explore past performances. See live dates and venue details, and follow Udi Shlomo Music on Bandsintown for updates.",
    label: "Concerts",
    type: "CollectionPage",
  },
  contact: {
    path: "contact/",
    title: "Contact & Booking | Udi Shlomo",
    description: "Contact Udi Shlomo for concert bookings, recording sessions and press enquiries. Find email and phone details for the drummer and composer in Trondheim, Norway.",
    label: "Contact",
    type: "ContactPage",
  },
  epk: {
    path: "epk/",
    title: "Electronic Press Kit (EPK) | Udi Shlomo",
    description: "Explore Udi Shlomo's electronic press kit: artist biography, album and concert reviews, live videos, booking contact details and downloadable press materials.",
    label: "Electronic press kit",
    type: "WebPage",
  },
} as const;

export type SeoPage = keyof typeof seoPages;

export function pageMetadata(key: SeoPage): Metadata {
  const { path, title, description } = seoPages[key];
  const image = {
    url: siteUrl("social-card.png"),
    width: 1200,
    height: 630,
    alt: "Udi Shlomo, jazz drummer, composer and arranger, standing between two cymbals",
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
      type: "website",
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

import { biography, site, socials } from "@/data/site-content";
import { seoPages, siteUrl, type SeoPage } from "@/lib/seo";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SiteStructuredData() {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": siteUrl("#artist"),
        name: site.name,
        url: siteUrl(),
        sameAs: socials.map(({ href }) => href),
      },
      {
        "@type": "WebSite",
        "@id": siteUrl("#website"),
        name: site.name,
        url: siteUrl(),
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": siteUrl("#artist") },
      },
    ],
  }} />;
}

export function PageStructuredData({ page }: { page: SeoPage }) {
  const { path, title, description, label, type } = seoPages[page];
  const url = siteUrl(path);
  const artist = siteUrl("#artist");
  const group = siteUrl("#group");
  const listen = socials
    .filter(({ label }) => ["YouTube", "Spotify", "Bandcamp", "Apple Music"].includes(label))
    .map(({ href }) => href);
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
      ...(page === "home" ? [] : [{ "@type": "ListItem", position: 2, name: label, item: url }]),
    ],
  };
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": siteUrl("#website") },
        about: { "@id": artist },
        ...(page === "home" || page === "epk" ? { image: siteUrl("images/hero-udi-wide.jpg") } : {}),
        ...(page === "about" ? { image: siteUrl("images/gallery/udi-transform.jpg") } : {}),
        ...(page === "about"
          ? {
              mainEntity: {
                "@type": "Person",
                "@id": artist,
                name: site.name,
                description: biography[0],
                jobTitle: ["Drummer", "Composer", "Arranger"],
                image: siteUrl("images/gallery/udi-transform.jpg"),
                homeLocation: { "@type": "Place", name: "Trondheim" },
                sameAs: socials.map(({ href }) => href),
                url: siteUrl(),
              },
            }
          : {}),
        ...(page === "music" ? { mainEntity: { "@id": group } } : {}),
        ...(page === "contact"
          ? {
              mainEntity: {
                "@type": "Person",
                "@id": artist,
                name: site.name,
                email: site.email,
                telephone: site.phoneDisplay,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Trondheim",
                  addressCountry: "Norway",
                },
              },
            }
          : {}),
        ...(page === "home" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
      },
      ...(page === "home"
        ? [
            {
              "@type": "Person",
              "@id": artist,
              name: site.name,
              description: "Drummer, composer and arranger, based in Trondheim.",
              jobTitle: ["Drummer", "Composer", "Arranger"],
              image: siteUrl("images/hero-udi-wide.jpg"),
              homeLocation: { "@type": "Place", name: "Trondheim" },
            },
            {
              "@type": "MusicGroup",
              "@id": group,
              name: site.name,
              url: siteUrl(),
              genre: "World Jazz",
              image: siteUrl("images/hero-udi-wide.jpg"),
              sameAs: socials.map(({ href }) => href),
            },
          ]
        : []),
      ...(page === "music"
        ? [
            {
              "@type": "MusicAlbum",
              "@id": siteUrl("music/#you-and-me"),
              name: "You & Me",
              byArtist: { "@id": group },
            },
            {
              "@type": "MusicGroup",
              "@id": group,
              name: site.name,
              url,
              sameAs: listen,
              album: { "@id": siteUrl("music/#you-and-me") },
            },
          ]
        : []),
      ...(page === "home" ? [] : [breadcrumb]),
    ],
  }} />;
}

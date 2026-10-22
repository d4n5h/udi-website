import { site, socials } from "@/data/site-content";
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
        description: site.description,
        image: siteUrl("images/hero-udi-wide.jpg"),
        jobTitle: ["Drummer", "Composer", "Arranger"],
        homeLocation: { "@type": "Place", name: site.location },
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
        about: { "@id": siteUrl("#artist") },
        ...(page === "about" ? { mainEntity: { "@id": siteUrl("#artist") } } : {}),
        ...(page === "home" ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
      },
      ...(page === "home" ? [] : [breadcrumb]),
    ],
  }} />;
}

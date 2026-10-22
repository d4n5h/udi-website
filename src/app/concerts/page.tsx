import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import { BandsintownWidget } from "@/components/media/bandsintown-widget";

export const metadata = pageMetadata("concerts");

export default function ConcertsPage() {
  return (
    <section className="shell py-12 sm:py-16">
      <PageStructuredData page="concerts" />
      <h1 className="sr-only">Concerts</h1>
      <BandsintownWidget />
    </section>
  );
}

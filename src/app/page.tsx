import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import { QuoteCarousel } from "@/components/home/quote-carousel";
import { FacebookPageEmbed } from "@/components/media/facebook-page-embed";
import { PhotoHero } from "@/components/photo-hero";
import { reviews } from "@/data/site-content";

export const metadata = pageMetadata("home");

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <PageStructuredData page="home" />
      <h1 className="sr-only">Udi Shlomo</h1>
      <PhotoHero showText={false} fade="#111111" title="" subtitle="" />
      <FacebookPageEmbed />
      <QuoteCarousel reviews={reviews.filter((review) => review.home)} />
    </div>
  );
}

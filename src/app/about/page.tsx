import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import Image from "next/image";
import { PhotoLightboxGallery } from "@/components/media/photo-lightbox-gallery";
import { ReviewList } from "@/components/review-list";
import { biography, gallery, reviews, venues } from "@/data/site-content";

export const metadata = pageMetadata("about");

const aboutReviews = reviews.filter((review) => review.about);
const [portrait, ...photos] = gallery;
const venuesLead = biography[2].slice(0, biography[2].indexOf(":") + 1);

export default function AboutPage() {
  return (
    <>
      <PageStructuredData page="about" />
      <section className="shell grid gap-10 pt-6 pb-20 sm:pt-10 sm:pb-28 md:grid-cols-[min(40%,calc((100svh-12rem)*2/3))_1fr] md:gap-x-12 md:pt-16 lg:gap-x-20">
        <h1 className="sr-only">Biography and reviews</h1>
        <figure className="max-w-md md:sticky md:top-24 md:max-w-none md:self-start">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            preload
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">{portrait.caption}</figcaption>
        </figure>

        <div className="max-w-3xl">
          <p className="text-statement">{biography[0]}</p>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed">{biography[1]}</p>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed">{venuesLead}</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 text-[0.9375rem] leading-snug sm:gap-x-6 sm:text-base">
            {venues.map((venue) => (
              <li key={venue} className="border-t border-border py-3">
                {venue}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-card">
        <div className="shell py-20 sm:py-28">
          <h2 className="text-display-2">On the stand</h2>
          <div className="mt-10">
            <PhotoLightboxGallery photos={photos} />
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28">
        <h2 className="text-display-2">Reviews</h2>
        <div className="mt-12">
          <ReviewList reviews={aboutReviews} compact />
        </div>
      </section>
    </>
  );
}

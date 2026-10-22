import type { Metadata } from "next";
import Image from "next/image";
import { PhotoLightboxGallery } from "@/components/media/photo-lightbox-gallery";
import { ReviewList } from "@/components/review-list";
import { biography, gallery, reviews, venues } from "@/data/site-content";

export const metadata: Metadata = {
  title: "About",
  description: biography[0],
};

const aboutReviews = reviews.filter((review) => review.about);

export default function AboutPage() {
  return (
    <>
      <section className="relative h-80 sm:h-96">
        <Image
          src={gallery[0].src}
          alt={gallery[0].alt}
          fill
          preload
          className="object-cover object-[center_10%]"
          sizes="100vw"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-end bg-[#14171f]/75 px-5 py-3 sm:px-8">
          <h1 className="sr-only">About</h1>
          <p className="text-[#f4f1ea]">{gallery[0].caption}</p>
        </div>
      </section>

      <section className="bg-card">
        <div className="shell py-16 sm:py-24">
          <p className="text-statement max-w-4xl">{biography[0]}</p>
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            {biography.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-xl text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28">
        <h2 className="text-display-2 max-w-[14ch]">Rooms and festivals</h2>
        <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <li key={venue} className="text-xl">
              {venue}
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-20 sm:pb-28">
        <h2 className="text-display-2 max-w-[12ch]">On the stand</h2>
        <div className="mt-10">
          <PhotoLightboxGallery photos={gallery} />
        </div>
      </section>

      <section className="bg-card">
        <div className="shell py-20 sm:py-28">
          <h2 className="text-display-2">Reviews</h2>
          <div className="mt-12">
            <ReviewList reviews={aboutReviews} compact />
          </div>
        </div>
      </section>
    </>
  );
}

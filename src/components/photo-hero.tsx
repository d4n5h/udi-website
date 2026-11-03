import Image from "next/image";
import { BookIcon } from "@/components/heading-icon";
import { heroPhoto } from "@/data/site-content";

export function PhotoHero({
  title,
  subtitle,
  fade,
  showText = true,
}: {
  title: string;
  subtitle: string;
  fade?: string;
  showText?: boolean;
}) {
  return (
    <section className="relative overflow-hidden sm:min-h-[calc(100svh-4.5rem)]">
      <div className="hero-photo">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          width={heroPhoto.width}
          height={heroPhoto.height}
          preload
          sizes="100vw"
        />
      </div>
      {showText ? (
        <div className="absolute inset-0 z-10 flex flex-col justify-end">
          <div className="shell pb-8 sm:pb-16">
            <h1 className="inline-flex items-center gap-2.5 text-3xl leading-tight text-[#f4f1ea] sm:text-4xl">
              <BookIcon className="size-7" />
              {title}
            </h1>
            <p className="mt-1.5 max-w-xl text-sm leading-snug text-[#f4f1ea] sm:mt-3 sm:text-xl">
              {subtitle}
            </p>
            <p className="mt-1 text-xs text-[#f4f1ea] sm:mt-2 sm:text-base">{heroPhoto.caption}</p>
          </div>
        </div>
      ) : null}
      {fade ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${fade})` }}
        />
      ) : null}
    </section>
  );
}

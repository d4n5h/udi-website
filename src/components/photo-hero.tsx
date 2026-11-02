import Image from "next/image";
import { heroPhoto } from "@/data/site-content";

export function PhotoHero({
  title,
  subtitle,
  wave,
  fade,
}: {
  title: string;
  subtitle: string;
  wave?: string;
  fade?: string;
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
      <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <div className="shell pb-8 sm:pb-16">
          <h1 className="font-sans text-2xl font-medium leading-tight tracking-normal text-[#f4f1ea] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-1.5 max-w-xl text-sm leading-snug text-[#f4f1ea] sm:mt-3 sm:text-xl">
            {subtitle}
          </p>
          <p className="mt-1 text-xs text-[#f4f1ea] sm:mt-2 sm:text-base">{heroPhoto.caption}</p>
        </div>
      </div>
      {fade ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${fade})` }}
        />
      ) : null}
      {wave ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-8 w-full sm:h-16"
        >
          <path fill={wave} d="M0 48Q720 150 1440 48V160H0Z" />
        </svg>
      ) : null}
    </section>
  );
}

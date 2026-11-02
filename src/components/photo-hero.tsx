import Image from "next/image";
import { heroPhoto } from "@/data/site-content";

export function PhotoHero({
  title,
  subtitle,
  wave,
}: {
  title: string;
  subtitle: string;
  wave: string;
}) {
  return (
    <section className="relative overflow-hidden sm:min-h-[calc(100svh-4.5rem)]">
      <div className="relative aspect-[16/9] w-full sm:absolute sm:inset-y-0 sm:right-[-6.67%] sm:left-0 sm:aspect-auto">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          preload
          sizes="(max-width: 639px) 100vw, 107vw"
          className="object-cover object-center sm:object-[46.875%_40%]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4 pb-8 sm:min-h-[calc(100svh-4.5rem)] sm:p-8 sm:pb-16">
        <h1 className="font-sans text-2xl font-medium leading-tight tracking-normal text-[#f4f1ea] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-1.5 max-w-xl text-sm leading-snug text-[#f4f1ea] sm:mt-3 sm:text-xl">
          {subtitle}
        </p>
        <p className="mt-1 text-xs text-[#f4f1ea] sm:mt-2 sm:text-base">{heroPhoto.caption}</p>
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-8 w-full sm:h-16"
      >
        <path fill={wave} d="M0 48Q720 150 1440 48V160H0Z" />
      </svg>
    </section>
  );
}

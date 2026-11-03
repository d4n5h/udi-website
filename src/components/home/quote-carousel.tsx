"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Review } from "@/data/site-content";

function quoted(quote: string) {
  return quote.startsWith("“") ? quote : `“${quote}”`;
}

const column = "relative z-10 col-start-2 px-5 sm:px-8";

export function QuoteCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = reviews.length;
  const review = reviews[index];

  function step(by: number) {
    setIndex((current) => (current + by + count) % count);
  }

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), 8000);
    return () => window.clearTimeout(timer);
  }, [paused, count, index]);

  if (!review) return null;

  return (
    <section
      className="relative z-10 grid grid-cols-[1fr_min(90rem,100%)_1fr] bg-black text-[#f4f1ea] lg:min-h-[min(calc(100svh-4.5rem),66.667vw)] lg:grid-rows-[auto_auto_auto_1fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] col-span-full h-40 bg-linear-to-b from-[#111111] to-transparent sm:h-56 lg:h-72"
      />
      <div className="relative col-span-full row-start-1 aspect-[3/2] w-full max-w-[calc((100svh-4.5rem)*1.5)] justify-self-center [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] lg:absolute lg:inset-y-0 lg:row-[1/-1] lg:left-1/2 lg:w-auto lg:max-w-full lg:-translate-x-1/2">
        <Image
          src={assetPath("/images/ostrava-live.webp")}
          alt="Udi Shlomo playing a ride cymbal under blue stage light"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent to-50% lg:bg-linear-to-r lg:from-black/85 lg:via-black/45 lg:via-35% lg:to-transparent lg:to-70%" />
      </div>

      <h2
        className={`${column} row-start-1 flex items-center gap-2.5 self-end pb-4 text-2xl leading-tight sm:pb-6 sm:text-3xl lg:self-start lg:pt-[clamp(2.5rem,7vh,5rem)] lg:pb-0`}
      >
        <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
            <path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.333-4 5" />
          </g>
        </svg>
        What they wrote
      </h2>

      <div className={`${column} row-start-2 flex items-center gap-3 pt-4 lg:pt-5`}>
        <Button type="button" size="sm" variant="light" onClick={() => step(-1)}>
          Previous
        </Button>
        <Button type="button" size="sm" onClick={() => step(1)}>
          Next
        </Button>
        <p className="ml-2 tabular-nums">
          {index + 1} / {count}
        </p>
      </div>

      <blockquote
        key={review.id}
        aria-live={paused ? "polite" : "off"}
        className={`${column} row-start-3 pt-5 pb-10 animate-in fade-in-0 duration-300 motion-reduce:animate-none sm:pb-14 lg:w-[min(40rem,50vw)] lg:pb-[clamp(2.5rem,7vh,5rem)]`}
      >
        <p className="font-display text-sm leading-snug sm:text-base sm:leading-relaxed 2xl:text-lg">
          {quoted(review.quote)}
        </p>
        <footer className="mt-3 flex flex-wrap items-baseline gap-x-3 sm:mt-4">
          <span>
            {review.author}
            {review.author !== review.publication ? `, ${review.publication}` : ""}
          </span>
          {review.href ? (
            <a href={review.href} target="_blank" rel="noopener noreferrer" className="text-primary">
              Read the review
            </a>
          ) : null}
        </footer>
      </blockquote>
    </section>
  );
}

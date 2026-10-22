"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/site-content";

function quoted(quote: string) {
  return quote.startsWith("“") ? quote : `“${quote}”`;
}

export function QuoteCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const count = reviews.length;
  const review = reviews[index];
  const indexRef = useRef(0);
  const swapRef = useRef<number | null>(null);

  function go(next: number) {
    if (count < 1) return;
    if (swapRef.current !== null) window.clearTimeout(swapRef.current);
    const target = ((next % count) + count) % count;
    setVisible(false);
    swapRef.current = window.setTimeout(() => {
      indexRef.current = target;
      setIndex(target);
      setVisible(true);
      swapRef.current = null;
    }, 200);
  }

  useEffect(() => {
    return () => {
      if (swapRef.current !== null) window.clearTimeout(swapRef.current);
    };
  }, []);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setInterval(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        const target = (indexRef.current + 1) % count;
        indexRef.current = target;
        setIndex(target);
        return;
      }
      if (swapRef.current !== null) window.clearTimeout(swapRef.current);
      setVisible(false);
      swapRef.current = window.setTimeout(() => {
        const target = (indexRef.current + 1) % count;
        indexRef.current = target;
        setIndex(target);
        setVisible(true);
        swapRef.current = null;
      }, 200);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  if (!review) return null;

  return (
    <section
      className="relative z-10 h-[52rem] overflow-hidden sm:h-[44rem] lg:h-[48rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Image
        src={assetPath("/images/ostrava-live.jpg")}
        alt="Udi Shlomo playing a ride cymbal under blue stage light"
        fill
        sizes="100vw"
        className="object-cover object-[58%_55%]"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="shell relative z-10 flex h-full flex-col py-8 sm:py-10">
        <h2 className="text-display-2 max-w-[12ch] text-[#f4f1ea]">What they wrote</h2>
        <blockquote
          className={`mt-4 max-w-4xl transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          aria-live="polite"
        >
          <p className="font-sans text-sm leading-snug text-[#f4f1ea] sm:text-base sm:leading-relaxed">
            {quoted(review.quote)}
          </p>
          <footer className="mt-5 flex flex-wrap items-baseline gap-x-3 text-[#f4f1ea]">
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
        <div className="mt-auto flex items-center gap-3 pt-6">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="h-12 bg-[#f4f1ea] px-4 text-[#14171f] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="h-12 bg-primary px-4 text-primary-foreground transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
          >
            Next
          </button>
          <p className="ml-2 tabular-nums text-[#f4f1ea]">
            {index + 1} / {count}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { bandsintown } from "@/data/site-content";

export function BandsintownWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const anchor = document.createElement("a");
    anchor.className = "bit-widget-initializer bandsintown-events";
    anchor.setAttribute("data-artist-name", bandsintown.artistName);
    anchor.setAttribute("data-text-color", bandsintown.textColor);
    anchor.setAttribute("data-link-color", bandsintown.linkColor);
    anchor.setAttribute("data-link-text-color", bandsintown.linkTextColor);
    anchor.setAttribute("data-background-color", bandsintown.backgroundColor);
    anchor.setAttribute("data-popup-background-color", bandsintown.popupBackgroundColor);
    anchor.setAttribute("data-display-local-dates", bandsintown.displayLocalDates);
    anchor.setAttribute("data-display-past-dates", bandsintown.displayPastDates);
    anchor.setAttribute("data-display-limit", bandsintown.displayLimit);
    anchor.setAttribute("data-auto-style", bandsintown.autoStyle);
    container.appendChild(anchor);

    document.querySelector('script[src*="widget.bandsintown.com/main.min.js"]')?.remove();
    const script = document.createElement("script");
    script.src = bandsintown.script;
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div ref={containerRef} className="min-h-[420px] w-full bg-card" />;
}

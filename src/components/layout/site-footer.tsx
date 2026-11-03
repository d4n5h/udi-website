"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site-content";
import { SocialLinks } from "@/components/layout/social-links";

function isCurrent(pathname: string, href: string) {
  return pathname.replace(/\/+$/, "") === href.replace(/\/+$/, "");
}

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="bg-black">
      <div className="shell flex flex-col gap-6 py-8 sm:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex justify-between gap-x-0.5 text-[clamp(0.75rem,3.5vw,1.0625rem)] whitespace-nowrap sm:justify-start sm:gap-x-6 sm:text-[1.0625rem]">
            {nav.map((item) => {
              const external = "external" in item && item.external;
              const current = !external && isCurrent(pathname, item.href);
              const className = current ? "text-primary" : "hover:text-primary";
              return external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={className}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SocialLinks className="self-center sm:self-auto" />
        </div>
        <p className="text-center text-sm text-muted-foreground">All Rights Reserved ©</p>
      </div>
    </footer>
  );
}

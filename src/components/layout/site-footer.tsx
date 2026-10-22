import Link from "next/link";
import { nav } from "@/data/site-content";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter() {
  return (
    <footer className="bg-card">
      <div className="shell flex flex-col gap-6 py-8 sm:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) =>
              "external" in item && item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <SocialLinks />
        </div>
        <p className="text-center text-sm text-muted-foreground">All Rights Reserved ©</p>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { nav } from "@/data/site-content";
import { SocialLinks } from "@/components/layout/social-links";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function NavLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const pathname = usePathname();
  const current = !external && pathname === href;
  const className = `text-base transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
    current ? "text-primary" : "text-foreground hover:text-primary"
  }`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} aria-current={current ? "page" : undefined} className={className}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 active:scale-[0.97] transition-transform duration-150">
          <Image
            src={assetPath("/images/logo.png")}
            alt="Udi Shlomo"
            width={150}
            height={32}
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <SocialLinks className="hidden xl:flex" />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-0 bg-background shadow-none sm:max-w-sm"
          >
            <SheetHeader>
              <SheetTitle className="font-display text-3xl">Udi Shlomo</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-5 px-4 text-2xl">
              {nav.map((item) =>
                "external" in item && item.external ? (
                  <SheetClose asChild key={item.href}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </SheetClose>
                ) : (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </SheetClose>
                ),
              )}
            </nav>
            <SocialLinks className="px-2 pt-6" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

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

function isCurrent(pathname: string, href: string) {
  return pathname.replace(/\/+$/, "") === href.replace(/\/+$/, "");
}

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
  const current = !external && isCurrent(pathname, href);
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

function MobileNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Mobile" className="flex flex-col gap-5 px-4 text-2xl">
      {nav.map((item) => {
        const external = "external" in item && item.external;
        const current = !external && isCurrent(pathname, item.href);
        const className = current ? "text-primary" : undefined;
        return (
          <SheetClose asChild key={item.href}>
            {external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                {item.label}
              </a>
            ) : (
              <Link href={item.href} aria-current={current ? "page" : undefined} className={className}>
                {item.label}
              </Link>
            )}
          </SheetClose>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black/85 backdrop-blur-md">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 active:scale-[0.97] transition-transform duration-150">
          <Image
            src={assetPath("/images/logo.png")}
            alt="Udi Shlomo"
            width={188}
            height={40}
            priority
            className="h-10 w-auto"
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
              <SheetTitle className="font-sans text-3xl tracking-normal">Udi Shlomo</SheetTitle>
            </SheetHeader>
            <MobileNav />
            <SocialLinks className="px-2 pt-6" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

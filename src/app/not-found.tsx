import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Udi Shlomo" },
  description: "This page is not on the Udi Shlomo website. Return home for music, concerts and booking.",
};

export default function NotFound() {
  return (
    <section className="shell py-24">
      <h1 className="text-display-1">Page not found</h1>
      <p className="mt-6 max-w-md text-xl">This page is not on the site.</p>
      <Link href="/" className="mt-8 inline-block text-primary">
        Back to home
      </Link>
    </section>
  );
}

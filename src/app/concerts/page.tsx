import type { Metadata } from "next";
import { BandsintownWidget } from "@/components/media/bandsintown-widget";

export const metadata: Metadata = {
  title: "Concerts",
  description: "Upcoming and past concerts for Udi Shlomo Music, via Bandsintown.",
};

export default function ConcertsPage() {
  return (
    <section className="shell py-12 sm:py-16">
      <h1 className="sr-only">Concerts</h1>
      <BandsintownWidget />
    </section>
  );
}

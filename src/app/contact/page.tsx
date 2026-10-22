import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialLinks } from "@/components/layout/social-links";
import { site } from "@/data/site-content";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <section className="shell grid gap-14 py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)] sm:py-24">
      <PageStructuredData page="contact" />
      <div>
        <h1 className="text-display-1">Contact</h1>
        <p className="mt-6 max-w-md text-xl">
          For concerts, recordings and press, write directly.
        </p>
        <p className="mt-8 text-lg">
          <a href={`mailto:${site.email}`} className="text-primary">
            {site.email}
          </a>
        </p>
        <p className="mt-2 text-lg">
          <a href={site.phoneHref} className="tabular-nums hover:text-primary">
            {site.phoneDisplay}
          </a>
        </p>
        <p className="mt-2 text-lg">{site.location}</p>
        <SocialLinks className="mt-6" />
      </div>
      <ContactForm />
    </section>
  );
}

import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/structured-data";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialLinks } from "@/components/layout/social-links";
import { MailIcon } from "@/components/heading-icon";
import { site } from "@/data/site-content";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <section className="shell grid gap-14 py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)] sm:py-24">
      <PageStructuredData page="contact" />
      <div>
        <h1 className="inline-flex items-center gap-2.5 text-2xl leading-tight sm:text-3xl">
          <MailIcon />
          Contact
        </h1>
        <p className="mt-6 max-w-md text-xl">
          For concerts, recordings and press, send a message.
        </p>
        <SocialLinks className="mt-6" />
      </div>
      <ContactForm />
    </section>
  );
}

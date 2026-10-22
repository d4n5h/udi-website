"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { site } from "@/data/site-content";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";

export function ContactForm() {
  const [draftOpened, setDraftOpened] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    const fullName = [values.firstName, values.lastName].filter(Boolean).join(" ");
    const subject = encodeURIComponent(`Website enquiry from ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${values.email}\n\n${values.message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setDraftOpened(true);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <p className="text-sm text-muted-foreground">
        This form opens a draft in your email app. Review it there and send it to {site.email}.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" autoComplete="given-name" {...form.register("firstName")} />
          {form.formState.errors.firstName ? (
            <p className="text-sm text-[#e57373]" role="alert">
              {form.formState.errors.firstName.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" autoComplete="family-name" {...form.register("lastName")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@domain.com"
          autoComplete="email"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="text-sm text-[#e57373]" role="alert">
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" rows={5} {...form.register("message")} />
        {form.formState.errors.message ? (
          <p className="text-sm text-[#e57373]" role="alert">
            {form.formState.errors.message.message}
          </p>
        ) : null}
      </div>

      {draftOpened ? (
        <p className="bg-[#1b2a22] px-4 py-3 text-sm text-[#b8e6c8]" role="status">
          Your email app should open with a draft. Send it there to complete your enquiry.
          If it did not open, email <a href={`mailto:${site.email}`} className="underline">{site.email}</a> directly.
        </p>
      ) : null}

      <Button type="submit">Open Email Draft</Button>
    </form>
  );
}

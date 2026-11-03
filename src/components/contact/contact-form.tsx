"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { site } from "@/data/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";

const captchaKey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

export function ContactForm() {
  const [captcha, setCaptcha] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [notice, setNotice] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      botcheck: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    if (values.botcheck) return;
    if (!captcha) return;
    const fullName = [values.firstName, values.lastName].filter(Boolean).join(" ");
    setStatus("sending");
    setNotice("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          subject: `Website enquiry from ${fullName}`,
          from_name: "Udi Shlomo website",
          name: fullName,
          email: values.email,
          message: values.message,
          botcheck: values.botcheck,
          "h-captcha-response": captcha,
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        setStatus("error");
        setNotice(result.message || "The message could not be sent. Please try again.");
        return;
      }
      setStatus("sent");
      setNotice("Your message was sent.");
      form.reset();
      setCaptcha("");
    } catch {
      setStatus("error");
      setNotice("The message could not be sent. Please try again.");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <p className="text-sm text-muted-foreground">
        For concerts, recordings and press.
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

      <input type="checkbox" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("botcheck")} />

      <HCaptcha
        sitekey={captchaKey}
        reCaptchaCompat={false}
        theme="dark"
        onVerify={(token) => setCaptcha(token)}
        onExpire={() => setCaptcha("")}
      />

      {notice ? (
        <p
          className={status === "sent" ? "bg-[#1b2a22] px-4 py-3 text-sm text-[#b8e6c8]" : "px-4 py-3 text-sm text-[#e57373]"}
          role="status"
        >
          {notice}
        </p>
      ) : null}

      <Button type="submit" disabled={!captcha || status === "sending"}>
        {status === "sending" ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}

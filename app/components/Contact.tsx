"use client";

import { useState, type FormEvent } from "react";
import MotionWrapper from "./MotionWrapper";
import SectionIntro from "./SectionIntro";
import { siteConfig } from "../lib/site";

const fieldClass =
  "w-full min-h-12 rounded-xl border border-field-line bg-surface px-4 py-3 text-[17px] text-ink placeholder:text-muted transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const channels = [
  { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/-/g, "")}` },
  { label: "GitHub", value: "fish-shy", href: siteConfig.socials.github },
  { label: "LinkedIn", value: "hafiz-nazwa-nugraha", href: siteConfig.socials.linkedin },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // There is no backend: the form drafts an email in the visitor's own mail app.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Hi Hafiz,\n\n${formData.message}\n\n${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const field = (id: "name" | "email" | "subject", label: string, type: string, placeholder: string, autoComplete?: string) => (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium text-ink">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        autoComplete={autoComplete}
        value={formData[id]}
        onChange={handleChange}
        required
        className={fieldClass}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-5 sm:px-6 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionIntro
          id="contact-heading"
          eyebrow="Contact"
          lede="Email is the fastest way to reach me. Tell me what you're building and when you need it."
        >
          Have a project in mind?
        </SectionIntro>

        <MotionWrapper className="flex flex-col items-center gap-6">
          <a
            href={`mailto:${siteConfig.email}`}
            className="press inline-flex min-h-14 max-w-full items-center rounded-full bg-accent px-8 text-[17px] font-medium text-on-accent hover:opacity-90 [overflow-wrap:anywhere]"
          >
            {siteConfig.email}
          </a>
          <ul className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
            {channels.map((channel) => {
              const external = channel.href.startsWith("http");
              return (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "me noopener noreferrer" : undefined}
                    className="press flex min-h-16 flex-col justify-center rounded-2xl bg-tile px-5 py-3 text-center hover:bg-line"
                  >
                    <span className="text-[13px] text-muted">{channel.label}</span>
                    <span className="text-[17px] font-medium text-ink">{channel.value}</span>
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </MotionWrapper>

        <MotionWrapper className="mx-auto mt-14 max-w-3xl rounded-[28px] bg-tile p-6 sm:p-10">
          <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-ink">Or write it here.</h3>
          <p className="mt-1 text-[15px] text-muted">
            This opens a draft in your own email app. Nothing is stored on this site.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", "Name", "text", "Your name", "name")}
              {field("email", "Email", "email", "email@example.com", "email")}
            </div>
            {field("subject", "Subject", "text", "What the project is")}
            <div>
              <label htmlFor="message" className="mb-2 block text-[15px] font-medium text-ink">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${fieldClass} resize-y`}
                placeholder="Scope, timeline, and anything I should know"
              />
            </div>
            <button
              type="submit"
              className="press inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-[17px] font-medium text-paper hover:opacity-90"
            >
              Draft this email
            </button>
            <p role="status" className="min-h-[1.25rem] text-[15px] text-ink">
              {submitted &&
                `Your email app should now have a draft ready to send. If nothing opened, write to ${siteConfig.email} directly.`}
            </p>
          </form>
        </MotionWrapper>
      </div>
    </section>
  );
}

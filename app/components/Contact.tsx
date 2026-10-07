"use client";

import { useState, type FormEvent } from "react";
import MotionWrapper from "./MotionWrapper";
import SectionHeader from "./SectionHeader";
import { siteConfig } from "../lib/site";

const fieldClass =
  "w-full min-h-12 px-4 py-3 rounded-md border border-field-line bg-surface text-ink placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-colors";

const channels = [
  { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/-/g, "")}` },
  { label: "GitHub", value: "github.com/fish-shy", href: siteConfig.socials.github },
  { label: "LinkedIn", value: "in/hafiz-nazwa-nugraha", href: siteConfig.socials.linkedin },
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

  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-4 sm:px-6 py-16 md:py-24">
      <MotionWrapper className="max-w-6xl mx-auto">
        <SectionHeader id="contact-heading" index="05" label="Contact">
          Have a web or mobile project? Tell me about it.
        </SectionHeader>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm text-muted">Email is the fastest way to reach me.</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-block font-display text-[clamp(1.15rem,3.4vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent break-all"
            >
              {siteConfig.email}
            </a>

            <dl className="mt-10 border-y border-line divide-y divide-line">
              {channels.map((channel) => {
                const external = channel.href.startsWith("http");
                return (
                  <div key={channel.label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{channel.label}</dt>
                    <dd>
                      <a
                        href={channel.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "me noopener noreferrer" : undefined}
                        className="inline-flex items-center min-h-11 text-ink font-medium hover:text-accent transition-colors"
                      >
                        {channel.value}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </dd>
                  </div>
                );
              })}
              <div className="flex items-center justify-between gap-4 py-3 min-h-[3.25rem]">
                <dt className="text-sm text-muted">Location</dt>
                <dd className="text-ink font-medium">
                  {siteConfig.address.locality}, Indonesia
                </dd>
              </div>
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-6 lg:col-start-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={fieldClass}
                placeholder="What the project is"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`${fieldClass} resize-y`}
                placeholder="Scope, timeline, and anything I should know"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center min-h-12 px-6 rounded-md bg-accent text-on-accent font-semibold hover:opacity-90 transition-opacity"
              >
                Draft this email
              </button>
              <p className="text-sm text-muted">Nothing is stored on this site.</p>
            </div>

            <p role="status" className="text-sm text-ink min-h-[1.25rem]">
              {submitted &&
                `Your email app should now have a draft ready to send. If nothing opened, write to ${siteConfig.email} directly.`}
            </p>
          </form>
        </div>
      </MotionWrapper>
    </section>
  );
}

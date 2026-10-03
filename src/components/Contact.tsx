"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  academy,
  contact,
  contactSection,
  instagramUrl,
  telUrl,
  whatsappUrl,
} from "@/lib/content";

type Errors = { name?: string; reach?: string; message?: string };

const labelClass =
  "block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-soft/70";
const fieldClass =
  "mt-2 w-full rounded-none border-0 border-b border-linen bg-transparent px-0 py-3 text-[1rem] text-ink transition-colors placeholder:text-ink-soft/40 focus:border-maroon focus:outline-none focus:ring-0";

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const reach = String(data.get("reach") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (reach.length < 5) nextErrors.reach = "Please add a phone number or email.";
    if (message.length < 10)
      nextErrors.message = "Please tell us a little more (at least 10 characters).";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Class enquiry — ${academy.name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nContact: ${reach}\n\n${message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  }

  return (
    <section id="contact" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={contactSection.eyebrow}
            title={contactSection.title}
            lead={contactSection.lead}
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal delay={80}>
            <address className="not-italic">
              <dl className="space-y-7">
                <div>
                  <dt className={labelClass}>Studio</dt>
                  <dd className="mt-2 text-[1.05rem] leading-relaxed text-ink">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt className={labelClass}>Phone</dt>
                  <dd className="mt-2 flex flex-col gap-1.5">
                    {contact.phones.map((phone) => (
                      <a
                        key={phone.value}
                        href={`tel:+91${phone.value}`}
                        className="w-fit text-[1.05rem] text-ink underline decoration-linen decoration-1 underline-offset-4 transition-colors hover:text-maroon hover:decoration-gold"
                      >
                        {phone.value}
                      </a>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt className={labelClass}>WhatsApp</dt>
                  <dd className="mt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[1.05rem] text-ink underline decoration-linen decoration-1 underline-offset-4 transition-colors hover:text-maroon hover:decoration-gold"
                    >
                      {contact.whatsapp}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className={labelClass}>Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all text-[1.05rem] text-ink underline decoration-linen decoration-1 underline-offset-4 transition-colors hover:text-maroon hover:decoration-gold"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className={labelClass}>Instagram</dt>
                  <dd className="mt-2">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[1.05rem] text-ink underline decoration-linen decoration-1 underline-offset-4 transition-colors hover:text-maroon hover:decoration-gold"
                    >
                      {contact.instagram}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </address>
          </Reveal>

          <Reveal delay={180}>
            <div className="keyline bg-ivory p-6 sm:p-9">
              <h3 className="text-2xl text-maroon">Send an enquiry</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft/85">
                Fill this in and your mail app will open with the message ready
                to send to {contact.email}. Or simply call or message the academy
                directly.
              </p>

              <form onSubmit={onSubmit} noValidate className="mt-8 space-y-7">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-2 text-xs text-temple">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className={labelClass} htmlFor="reach">
                    Phone or email
                  </label>
                  <input
                    id="reach"
                    name="reach"
                    type="text"
                    autoComplete="tel"
                    placeholder="How should we reach you?"
                    aria-invalid={Boolean(errors.reach)}
                    aria-describedby={errors.reach ? "reach-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.reach ? (
                    <p id="reach-error" className="mt-2 text-xs text-temple">
                      {errors.reach}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className={labelClass} htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Age of student, prior dance experience, and what you are looking for…"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${fieldClass} resize-y`}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-xs text-temple">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-maroon px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:bg-ink hover:shadow-[0_12px_30px_-14px_rgba(122,31,43,0.9)]"
                  >
                    Send enquiry
                  </button>

                  <a
                    href={telUrl}
                    className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-maroon"
                  >
                    or call {contact.phones[0].value}
                  </a>
                </div>

                <p role="status" aria-live="polite" className="min-h-5 text-sm text-maroon">
                  {sent
                    ? "Your mail app should have opened — press send and we will reply shortly."
                    : ""}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

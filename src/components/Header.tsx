"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { academy, nav, telUrl, whatsappUrl } from "@/lib/content";
import { logoMark } from "@/lib/image-manifest";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-ink/95 shadow-[0_1px_0_rgba(200,162,75,0.35)] backdrop-blur-md"
          : "bg-gradient-to-b from-ink/85 via-ink/45 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#top"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src={logoMark}
            alt=""
            width={44}
            height={44}
            priority
            className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base text-ivory sm:text-lg">
              {academy.name}
            </span>
            <span className="mt-1.5 text-[0.58rem] font-medium uppercase tracking-[0.3em] text-gold-soft">
              Odissi · Puri
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[0.82rem] font-medium uppercase tracking-[0.16em] text-ivory/85 transition-colors hover:text-gold-soft after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full border border-gold/60 px-5 py-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-6 bg-ivory transition-transform duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ivory transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ivory transition-transform duration-300 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-gold/25 bg-ink/98 backdrop-blur-md md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-6xl flex-col px-5 pb-7 pt-4 sm:px-8"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-ivory/10 py-4 font-display text-xl text-ivory transition-colors hover:text-gold-soft"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gold px-5 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ink"
            >
              WhatsApp
            </a>
            <a
              href={telUrl}
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-gold/60 px-5 py-3 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-gold-soft"
            >
              Call
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

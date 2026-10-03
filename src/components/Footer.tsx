import Image from "next/image";
import Link from "next/link";
import Ornament from "@/components/Ornament";
import {
  academy,
  contact,
  guru,
  instagramUrl,
  nav,
  whatsappUrl,
} from "@/lib/content";
import { logo } from "@/lib/image-manifest";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Image
              src={logo}
              alt={academy.logoAlt}
              width={320}
              height={320}
              className="h-36 w-36 sm:h-40 sm:w-40"
            />
            <p className="mt-5 text-[0.66rem] uppercase tracking-[0.28em] text-gold-soft">
              {academy.descriptor}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/60">
              Guided by {guru.name}, {guru.role.toLowerCase()}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.68rem] uppercase tracking-[0.24em] text-ivory/45">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] text-ivory/80 transition-colors hover:text-gold-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.68rem] uppercase tracking-[0.24em] text-ivory/45">
              Contact
            </h2>
            <address className="mt-5 space-y-4 not-italic text-[0.95rem] leading-relaxed text-ivory/80">
              <p>
                {contact.addressLines.map((line) => (
                  <span key={line} className="block text-ivory/70">
                    {line}
                  </span>
                ))}
              </p>
              <p className="flex flex-col gap-1.5">
                {contact.phones.map((phone) => (
                  <a
                    key={phone.value}
                    href={`tel:+91${phone.value}`}
                    className="w-fit transition-colors hover:text-gold-soft"
                  >
                    {phone.value}
                  </a>
                ))}
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-gold-soft"
                >
                  {contact.email}
                </a>
              </p>
            </address>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-gold/50 px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
              >
                WhatsApp
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-ivory/25 px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-ivory/75 transition-colors hover:border-gold hover:text-gold-soft"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center text-gold/70">
          <Ornament className="h-5 w-52" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[0.75rem] tracking-wide text-ivory/45">
            © {year} {academy.name}. All rights reserved.
          </p>
          <p className="text-[0.75rem] tracking-wide text-ivory/45">
            Established {academy.founded} · {academy.city}
          </p>
        </div>
      </div>
    </footer>
  );
}

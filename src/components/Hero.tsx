import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { academy } from "@/lib/content";
import { heroImage, logoMark } from "@/lib/image-manifest";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-indigo"
    >
      <Image
        src={heroImage}
        alt="Dancers of Sukumari Kalakendra forming a many-armed Odissi tableau on stage"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_42%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,35,63,0.86)_0%,rgba(26,20,16,0.78)_45%,rgba(26,20,16,0.94)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14] mix-blend-screen bg-[radial-gradient(circle_at_20%_20%,#a62d2d_0%,transparent_45%),radial-gradient(circle_at_85%_75%,#c8a24b_0%,transparent_50%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <Reveal>
          <Image
            src={logoMark}
            alt=""
            width={112}
            height={112}
            priority
            className="h-24 w-24 drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] sm:h-28 sm:w-28"
          />
        </Reveal>

        <Reveal delay={90}>
          <p className="eyebrow eyebrow-on-dark mt-8">{academy.descriptor}</p>
        </Reveal>

        <Reveal delay={160}>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.02] text-ivory">
            {academy.name}
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-7 flex items-center gap-5 text-gold">
            <span className="rule w-16 sm:w-28" />
            <span className="text-xs font-medium uppercase tracking-[0.36em] text-gold-soft">
              Established {academy.founded}
            </span>
            <span className="rule hidden w-16 sm:block sm:w-28" />
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            Classical Odissi training in the temple city of Puri — taught with
            rigour, patience and a place on stage for every student.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:bg-ivory hover:shadow-[0_10px_30px_-10px_rgba(200,162,75,0.7)]"
            >
              Enquire about classes
            </Link>
            <Link
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full border border-ivory/40 px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:border-gold hover:text-gold-soft"
            >
              View the gallery
            </Link>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about the academy"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/60 transition-colors hover:text-gold-soft sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  );
}

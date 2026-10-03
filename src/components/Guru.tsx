import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { guru, guruSection } from "@/lib/content";
import { guruDetailImage, guruImage } from "@/lib/image-manifest";

const archStyle = {
  borderRadius: "50% 50% 6px 6px / 34% 34% 6px 6px",
} as const;

export default function Guru() {
  return (
    <section id="guru" className="relative bg-sand py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] bg-[radial-gradient(circle_at_78%_18%,rgba(200,162,75,0.28),transparent_42%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <Reveal>
              <div className="relative p-2" style={archStyle}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border border-gold/70"
                  style={archStyle}
                />
                <div
                  className="relative aspect-[3/4] overflow-hidden bg-ink"
                  style={archStyle}
                >
                  <Image
                    src={guruImage}
                    alt={`${guru.name} in full Odissi costume, arms raised above her head`}
                    fill
                    sizes="(min-width: 1024px) 36vw, 80vw"
                    className="object-cover object-[50%_28%]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={180} className="mt-6 flex items-center justify-center gap-4">
              <span className="rule w-10" />
              <span className="text-center text-[0.65rem] uppercase tracking-[0.3em] text-maroon/80">
                {guru.role}
              </span>
              <span className="rule w-10" />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <SectionHeading eyebrow={guruSection.eyebrow} title={guruSection.title} />
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.22em] text-maroon">
                {guruSection.lead}
              </p>
            </Reveal>

            <div className="mt-7 space-y-5">
              {guruSection.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={120 + i * 90}>
                  <p className="text-[1.02rem] leading-[1.8] text-ink-soft/90">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <blockquote className="flex-1 border-l-2 border-gold pl-5">
                <p className="font-display text-lg leading-relaxed text-maroon sm:text-xl">
                  “{guruSection.quote}”
                </p>
                <footer className="mt-3 text-[0.7rem] uppercase tracking-[0.24em] text-ink-soft/70">
                  {guru.name}
                </footer>
              </blockquote>

              <div className="keyline w-40 shrink-0 self-start overflow-hidden bg-ivory p-1.5 sm:w-44">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={guruDetailImage}
                    alt={`${guru.name} in performance, hands held in a mudra`}
                    fill
                    sizes="180px"
                    className="object-cover object-[45%_35%]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

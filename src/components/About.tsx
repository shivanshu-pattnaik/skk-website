import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { about } from "@/lib/content";
import { aboutImages, bandImage } from "@/lib/image-manifest";

export default function About() {
  const [primary, secondary] = aboutImages;

  return (
    <>
      <section id="about" className="relative bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow={about.eyebrow}
                  title={about.title}
                  lead={about.lead}
                />
              </Reveal>

              <div className="mt-9 space-y-6">
                {about.paragraphs.map((paragraph, i) => (
                  <Reveal key={i} delay={80 * (i + 1)}>
                    <p className="text-[1.02rem] leading-[1.8] text-ink-soft/90">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Reveal delay={120}>
                <div className="keyline relative overflow-hidden rounded-sm p-1.5">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={primary}
                      alt={about.altPrimary}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={260} className="relative z-10 -mt-20 ml-auto w-[62%] sm:-mt-24 sm:w-[56%]">
                <div className="keyline overflow-hidden rounded-sm bg-ivory p-1.5 shadow-[0_24px_60px_-30px_rgba(26,20,16,0.75)]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={secondary}
                      alt={about.altSecondary}
                      fill
                      sizes="(min-width: 1024px) 24vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 grid gap-px overflow-hidden rounded-sm bg-linen sm:grid-cols-3">
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 110}>
                <div className="h-full bg-ivory p-7 transition-colors duration-300 hover:bg-sand sm:p-8">
                  <span className="font-display text-sm tracking-[0.3em] text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-xl text-maroon">{pillar.title}</h3>
                  <div className="rule mt-4 max-w-[7rem]" />
                  <p className="mt-4 text-[0.97rem] leading-relaxed text-ink-soft/85">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="The academy in assembly" className="relative isolate">
        <div className="relative aspect-[16/7] w-full sm:aspect-[21/7]">
          <Image
            src={bandImage}
            alt="The full troupe of Sukumari Kalakendra assembled on stage"
            fill
            sizes="100vw"
            className="object-cover object-[50%_38%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.55),rgba(26,20,16,0.2)_45%,rgba(26,20,16,0.8))]"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-8 sm:px-8 sm:pb-10">
            <p className="max-w-xl font-display text-lg text-ivory sm:text-2xl">
              One troupe, from the youngest student to the senior dancers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

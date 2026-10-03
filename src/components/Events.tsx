import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { events } from "@/lib/content";
import { photos } from "@/lib/image-manifest";

const photoById = new Map(photos.map((p) => [p.id, p]));

export default function Events() {
  return (
    <section id="events" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={events.eyebrow}
            title={events.title}
            lead={events.lead}
          />
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {events.items.map((item, i) => {
            const photo = photoById.get(item.imageId);
            return (
              <Reveal key={item.title} delay={(i % 2) * 120}>
                <article className="group h-full">
                  <div className="keyline relative overflow-hidden p-1.5 transition-colors duration-300 group-hover:border-gold">
                    <div className="relative aspect-[3/2] overflow-hidden bg-ink">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 640px) 46vw, 92vw"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
                        />
                      ) : null}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-between gap-4 border-b border-linen pb-3">
                      <h3 className="text-xl text-maroon sm:text-[1.35rem]">
                        {item.title}
                      </h3>
                      <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.2em] text-ink-soft/65">
                        {item.place}
                      </span>
                    </div>
                    <p className="mt-4 text-[0.98rem] leading-[1.75] text-ink-soft/85">
                      {item.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

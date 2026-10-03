"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { gallery } from "@/lib/content";
import {
  galleryCategories,
  photos,
  type GalleryCategory,
} from "@/lib/image-manifest";

type Filter = GalleryCategory | "all";

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="gallery" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={gallery.eyebrow}
            title={gallery.title}
            lead={gallery.lead}
            tone="light"
          />
        </Reveal>

        <Reveal delay={90}>
          <div
            role="group"
            aria-label="Filter gallery"
            className="mt-9 flex flex-wrap gap-2.5"
          >
            {galleryCategories.map((category) => {
              const isActive = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setFilter(category.id);
                    setActiveIndex(null);
                  }}
                  className={`rounded-full border px-5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? "border-gold bg-gold text-ink"
                      : "border-ivory/25 text-ivory/70 hover:border-gold/70 hover:text-gold-soft"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="masonry mt-12">
          {visible.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open photograph: ${photo.caption}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-maroon-deep text-left"
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: `${photo.src.width} / ${photo.src.height}` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  loading={i < 3 ? "eager" : "lazy"}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold-soft">
                    {galleryCategories.find((c) => c.id === photo.category)?.label}
                  </p>
                  <p className="mt-1.5 font-display text-base text-ivory">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && visible[activeIndex] ? (
        <Lightbox
          items={visible}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </section>
  );
}

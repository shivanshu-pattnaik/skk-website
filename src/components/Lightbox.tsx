"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/image-manifest";

type Props = {
  items: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = items[index];

  useEffect(() => {
    closeRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((index + 1) % items.length);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((index - 1 + items.length) % items.length);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]',
      );
      if (!focusable || focusable.length === 0) return;

      const list = Array.from(focusable);
      const first = list[0];
      const last = list[list.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onClose, onNavigate]);

  if (!photo) return null;

  const prev = () => onNavigate((index - 1 + items.length) % items.length);
  const next = () => onNavigate((index + 1) % items.length);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${items.length}: ${photo.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-gold/25 px-4 py-4 sm:px-7">
        <p className="truncate font-display text-sm text-gold-soft sm:text-base">
          {photo.caption}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[0.7rem] tabular-nums uppercase tracking-[0.2em] text-ivory/55">
            {index + 1} / {items.length}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-gold hover:text-gold-soft"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 py-5 sm:px-16">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photograph"
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 bg-ink/70 text-ivory transition-colors hover:border-gold hover:text-gold-soft sm:left-4"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative h-full w-full max-w-5xl">
          <Image
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next photograph"
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 bg-ink/70 text-ivory transition-colors hover:border-gold hover:text-gold-soft sm:right-4"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p className="mx-auto max-w-3xl px-6 pb-6 text-center text-sm leading-relaxed text-ivory/70 sm:pb-8">
        {photo.alt}
      </p>
    </div>
  );
}

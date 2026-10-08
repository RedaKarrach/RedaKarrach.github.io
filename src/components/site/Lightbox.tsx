"use client";

import { useEffect, useRef } from "react";
import { useFocusTrap, useScrollLock } from "@/lib/hooks";
import { useApp } from "@/lib/providers";

export interface LightboxImage {
  base: string;
  alt: string;
  w: number;
  h: number;
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { t } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true);
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onIndex]);

  const img = images[index];
  const btn =
    "mono inline-flex h-10 min-w-10 items-center justify-center border border-rule-strong bg-bg px-3 text-sm hover:border-fg";

  return (
    <div
      className="bg-bg/95 fixed inset-0 z-[80] flex flex-col p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${img.alt} · ${t.lightbox.counter(index + 1, images.length)}`}
        className="mx-auto flex h-full w-full max-w-6xl flex-col"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="mono text-muted truncate text-[12px]">
            <span className="text-fg">{img.alt}</span> ·{" "}
            {t.lightbox.counter(index + 1, images.length)}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={btn}
              onClick={() => onIndex((index - 1 + images.length) % images.length)}
              aria-label={t.lightbox.prev}
            >
              ←
            </button>
            <button
              type="button"
              className={btn}
              onClick={() => onIndex((index + 1) % images.length)}
              aria-label={t.lightbox.next}
            >
              →
            </button>
            <button type="button" className={btn} onClick={onClose}>
              {t.lightbox.close}
            </button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <picture className="contents">
            <source type="image/avif" srcSet={`${img.base}-1600.avif`} />
            <img
              src={`${img.base}-1600.webp`}
              width={img.w}
              height={img.h}
              alt={img.alt}
              className="border-rule max-h-full max-w-full border object-contain"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}

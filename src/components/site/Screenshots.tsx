"use client";

import { useState } from "react";
import manifest from "@/content/screenshots.json";
import type { ProjectId, Screenshot } from "@/content/types";
import { useApp } from "@/lib/providers";
import { Lightbox, type LightboxImage } from "./Lightbox";

const sizes = manifest as Record<string, { w: number; h: number }>;

export function Screenshots({ project, shots }: { project: ProjectId; shots: Screenshot[] }) {
  const { t, tl } = useApp();
  const [open, setOpen] = useState<number | null>(null);

  const images: LightboxImage[] = shots
    .filter((s) => sizes[s.file])
    .map((s) => ({
      base: `/screenshots/${project}/${s.file}`,
      alt: tl(s.alt),
      w: sizes[s.file].w,
      h: sizes[s.file].h,
    }));

  if (images.length === 0) return <p className="text-muted text-sm">{t.projects.noScreens}</p>;

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {images.map((img, i) => {
          const thumbH = Math.round((640 / img.w) * img.h);
          return (
            <li key={img.base}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group border-rule bg-surface-1 hover:border-rule-strong block w-full border text-left"
              >
                <span className="sr-only">{t.projects.openShot}: </span>
                <picture>
                  <source type="image/avif" srcSet={`${img.base}-640.avif`} />
                  <img
                    src={`${img.base}-640.webp`}
                    width={640}
                    height={thumbH}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top opacity-90 transition-opacity group-hover:opacity-100"
                  />
                </picture>
                <span className="mono text-muted block truncate px-1.5 py-1 text-[10px]">
                  {String(i + 1).padStart(2, "0")} · {img.alt}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {open !== null ? (
        <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      ) : null}
    </>
  );
}

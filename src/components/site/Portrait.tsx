"use client";

import { useApp } from "@/lib/providers";

/** Round portrait with an accent ring. `size` is the rendered CSS size in px. */
export function Portrait({
  size = 280,
  priority = false,
  className = "",
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  const { t } = useApp();
  return (
    <picture className={`block ${className}`}>
      <source
        type="image/avif"
        srcSet="/profile/reda-200.avif 200w, /profile/reda-400.avif 400w"
        sizes={`${size}px`}
      />
      <img
        src="/profile/reda-400.webp"
        srcSet="/profile/reda-200.webp 200w, /profile/reda-400.webp 400w"
        sizes={`${size}px`}
        width={400}
        height={400}
        alt={t.hero.photoAlt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className="portrait aspect-square h-auto w-full rounded-full object-cover"
      />
    </picture>
  );
}

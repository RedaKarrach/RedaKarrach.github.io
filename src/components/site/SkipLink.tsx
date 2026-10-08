"use client";

import { useApp } from "@/lib/providers";

export function SkipLink() {
  const { t } = useApp();
  return (
    <a
      href="#main"
      className="bg-accent text-bg fixed top-3 left-3 z-[100] -translate-y-24 rounded-full px-4 py-2 text-sm font-semibold transition-transform focus:translate-y-0"
    >
      {t.a11y.skip}
    </a>
  );
}

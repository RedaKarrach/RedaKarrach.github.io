"use client";

import { useApp } from "@/lib/providers";
import dynamic from "next/dynamic";

const LabTopology = dynamic(() => import("./LabTopology").then((m) => m.LabTopology), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/3]" aria-hidden />
  ),
});
import { Section } from "./Section";

/** The interactive 3D view of both projects' infrastructure, explained in plain words. */
export function Lab() {
  const { t } = useApp();
  return (
    <Section
      id="lab"
      kicker={t.lab.kicker}
      title={t.lab.title}
      sub={t.lab.sub}
      className="bg-surface-1/50"
    >
      <div className="card p-3 sm:p-5">
        <LabTopology />
      </div>
    </Section>
  );
}

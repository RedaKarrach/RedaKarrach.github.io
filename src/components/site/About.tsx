"use client";

import { useApp } from "@/lib/providers";
import { Icon, type IconName } from "./Icon";
import { Section } from "./Section";

const factIcons: IconName[] = ["pin", "school", "globe", "calendar"];

export function About() {
  const { t } = useApp();
  return (
    <Section id="about" kicker={t.about.kicker} title={t.about.title}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed lg:col-span-7">
          {t.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="grid gap-3 self-start sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {t.about.facts.map((f, i) => (
            <li key={f.label} className="card card-3d flex gap-4 p-4">
              <span className="bg-accent-soft text-accent grid h-10 w-10 shrink-0 place-items-center rounded-full">
                <Icon name={factIcons[i]} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-muted text-xs font-semibold tracking-wide uppercase">
                  {f.label}
                </p>
                <p className="mt-0.5 text-[15px] leading-snug font-medium">{f.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
